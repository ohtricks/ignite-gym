import { VStack, Image, Text, Center, Heading, View, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

const signInSchema = yup.object({
    email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
    password: yup.string().required('Informe  senha.').min(6, 'A senha deve ter pelo menos 6 digitos.')
});

type FormDataProps = yup.InferType<typeof signInSchema>;

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema),
        defaultValues: {
            email: ''
        },
    });

    function handleNewAccount(){
        navigation.navigate('signUp');
    }

    function handleSingIn(data: FormDataProps){
        console.log(data);
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={5}>
                <Image 
                    source={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="cover"
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
                            Acesse sua conta
                        </Heading>

                        <Controller 
                            control={control}
                            name="email"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
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
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message} />
                            )}
                        />
                        
                        <Button title="Entrar" onPress={handleSubmit(handleSingIn)} />
                    </Center>
                </View>
                <Center mb={10}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>
                    <Button title="Criar conta" variant="outline"
                        onPress={handleNewAccount} />
                </Center>
            </VStack>
        </ScrollView>
    );
}