import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '@services/api';
import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps){
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function userAndTokenUpdated(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    }
    async function storageUserAndTokenSave(userData: UserDTO, token: string) {
        try {
            await storageUserSave(userData);
            await storageAuthTokenSave(token);   
            
        } catch (error) {
            throw error;
        }
    }

    async function signIn(email: string, password: string){
        try {
            setIsLoadingUserStorageData(true);
            const { data } = await api.post('/sessions', {email, password});

            if(data.user && data.token){
                await storageUserAndTokenSave(data.user, data.token);
                await userAndTokenUpdated(data.user, data.token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function signOut(){
        try {
            setIsLoadingUserStorageData(true);
            
            setUser({} as UserDTO);

            await storageUserRemove();
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        }finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData(){
        try {
            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();
            
            if(userLogged && token){
                await userAndTokenUpdated(userLogged, token);
            }
        } catch (error) {
            throw error;
        } finally{
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        //estou passando só {{user}} em vez de {{user: user}}
        //pois por ter o mesmo nome o react ja entende que está passando
        //o user pro user kk
        <AuthContext.Provider value={{ user, isLoadingUserStorageData, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}