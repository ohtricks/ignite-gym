import { VStack, Image, Text, Center, Heading, View, ScrollView } from "native-base";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <VStack flex={1} bg="gray.700" px={5}>
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

                    <Input 
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none" />
                    <Input 
                        placeholder="Senha"
                        secureTextEntry />
                    
                    <Button title="Entrar" />
                </Center>
            </View>
            <Center mb={10}>
                <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                    Ainda não tem acesso?
                </Text>
                <Button title="Criar conta" variant="outline" />
            </Center>
        </VStack>
    </ScrollView>
  );
}