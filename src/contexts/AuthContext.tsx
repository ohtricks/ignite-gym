import { UserDTO } from '@dtos/UserDTO';
import { createContext, ReactNode, useState } from 'react';
import { api } from '@services/api';

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps){
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    async function signIn(email: string, password: string){
        try {
            const { data } = await api.post('/sessions', {email, password});

            if(data.user){
                setUser(data.user);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        //estou passando só {{user}} em vez de {{user: user}}
        //pois por ter o mesmo nome o react ja entende que está passando
        //o user pro user kk
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}