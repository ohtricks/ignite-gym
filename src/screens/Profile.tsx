import { Center, ScrollView, Text, VStack, Skeleton } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const PHOTO_SIZE = 33;

export function Profile(){
    const [photoIsLoading, setPhotoIsLoading] = useState(true);
    return(
        <VStack>
            <ScreenHeader title="Perfil" />
            <ScrollView mt={6} px={10}>
                <Center>
                    {
                        photoIsLoading ? 
                        <Skeleton size={PHOTO_SIZE} rounded="full"
                            startColor="gray.500"
                            endColor="gray.400" />
                        :
                        <UserPhoto 
                            source={{ uri: 'https://github.com/ohtricks.png'}} 
                            size={PHOTO_SIZE} 
                            alt="Foto do usuário"
                        />
                    }
                    <TouchableOpacity>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>
                </Center>
            </ScrollView>
        </VStack>
    );
}