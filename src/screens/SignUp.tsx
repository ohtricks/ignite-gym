import { VStack, Image, Text, Center, Heading, View, ScrollView, useToast } from "native-base";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Nome obrigatório.'),
    email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
    password: yup.string().required('Informe  senha.').min(6, 'A senha deve ter pelo menos 6 digitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere')
});

type FormData = yup.InferType<typeof signUpSchema>;

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const toast = useToast();
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: {
            name: '', //setar valores iniciais/default
            email: '',
            password: '',
            password_confirm: ''
        },
        resolver: yupResolver(signUpSchema)
    });

    function handleGoBack(){
        navigation.goBack();
    }

    async function handleSingUp({name, email, password}: FormDataProps){
        try {
            setIsLoading(true);

            await api.post('/users', { name, email, password });
            await signIn(email, password);

        } catch (error) {
            setIsLoading(false);

            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possivel criar a conta. Tente mais tarde';
            
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }

    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={5}>
                <Image 
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="stretch"
                    position="absolute"
                />
                <Center mt={24}>
                    <Logo />
                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>
                <View flex={1} mt={10}>
                    <Center>
                        <Heading color="gray.100" fontSize="xl" m={6} fontFamily="heading">
                            Crie sua conta
                        </Heading>
                        <Controller 
                            control={control}
                            name="name"
                            render={({field: {onChange, value}}) => (
                                <Input placeholder="Nome" 
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.name?.message} />
                            )}
                        />

                        <Controller 
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message} />                            
                            )}
                        />

                        <Controller 
                            control={control}
                            name="password"
                            render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.password?.message} />                          
                            )}
                        />

                        <Controller 
                            control={control}
                            name="password_confirm"
                            render={({field: {onChange, value}}) => (
                            <Input 
                                placeholder="Confirme a Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(handleSingUp)}
                                returnKeyType="send"
                                errorMessage={errors.password_confirm?.message} />                        
                            )}
                        />
                        
                        <Button title="Criar e Acessar" 
                            onPress={handleSubmit(handleSingUp)}
                            isLoading={isLoading} />
                    </Center>
                </View>
                <Center mt={12}>
                    <Button title="Voltar" variant="outline" 
                        onPress={handleGoBack}/>
                </Center>
            </VStack>
        </ScrollView>
    );
}