import { VStack, Image, Text, Center, Heading, View, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
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

                        <Input 
                            placeholder="Nome" />

                        <Input 
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none" />

                        <Input 
                            placeholder="Senha"
                            secureTextEntry />

                        <Input 
                            placeholder="Confirme a Senha"
                            secureTextEntry />
                        
                        <Button title="Criar e Acessar" />
                    </Center>
                </View>
                <Center mb={10}>
                    <Button title="Voltar" variant="outline" 
                        onPress={handleGoBack}/>
                </Center>
            </VStack>
        </ScrollView>
    );
}