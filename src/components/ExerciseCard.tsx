import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
    
}
export function ExerciseCard({...rest}: Props){
    return (
        <TouchableOpacity>
            <HStack 
                bg="gray.500" 
                alignItems="center" 
                p={2}
                rounded="md"
                mb={3}>
                <Image source={{uri:'https://www.fiberoficial.com.br/cdn/shop/articles/Treino_de_forca_feminino.jpg?v=1690387844&width=2048'}} 
                    alt="dsds"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={2}
                />

                <VStack flex={1}>
                    <Heading fontSize="lg" color="white">
                        Remada unilateral
                    </Heading>
                    <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
                        3 séries x 12 repetições
                    </Text>
                </VStack>

                <Icon as={Entypo} name="chevron-thin-right" color="gray.300" mr={1} />
            </HStack>
        </TouchableOpacity>
    );
}