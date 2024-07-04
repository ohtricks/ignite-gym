import { Text, VStack, Heading, HStack, Icon } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons";

export function HomeHeader(){
    return(
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto source={{uri: 'https://github.com/ohtricks.png'}}
                size={16}
                alt="Foto/imagem do usuário"
                mr={4} />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">
                    Olá,        
                </Text>
                <Heading color="gray.100" fontSize="md" fontFamily="heading">
                    Rafael
                </Heading>
            </VStack>

            <Icon 
                as={MaterialIcons}
                name="logout"
                color="gray.200"
                size={7} />
        </HStack>
    );
}