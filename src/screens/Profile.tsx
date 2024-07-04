import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as ImagePicker from 'expo-image-picker';

const PHOTO_SIZE = 33;

export function Profile(){
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/ohtricks.png');

    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4], //deixa a foto 4 por 4
                allowsEditing: true,  //habilita edição da imagem
            });
    
            if(photoSelected.canceled || !photoSelected.assets[0].uri){
                return;
            }

            if(photoSelected.assets[0].fileSize && (photoSelected.assets[0].fileSize / 1024 / 1024) > 5){
                return toast.show({
                    title: 'Imagem muito grande zé! Só aceito até 5MB',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            setUserPhoto(photoSelected.assets[0].uri);
        } catch (error) {
            console.log(error);
        } finally{
            setPhotoIsLoading(false);
        }
    }

    return(
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView>
                <Center mt={6} px={10}>
                    {
                        photoIsLoading ? 
                        <Skeleton size={PHOTO_SIZE} rounded="full"
                            startColor="gray.500"
                            endColor="gray.400" />
                        :
                        <UserPhoto 
                            source={{ uri: userPhoto}} 
                            size={PHOTO_SIZE} 
                            alt="Foto do usuário"
                        />
                    }
                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Input placeholder='Nome'
                        bg="gray.600" />

                    <Input placeholder='E-mail'
                        bg="gray.600"
                        isDisabled />
                </Center>
                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
                        Alterar senha
                    </Heading>

                    <Input placeholder='Senha antiga'
                        bg="gray.600"
                        secureTextEntry />

                    <Input placeholder='Nova senha'
                        bg="gray.600"
                        secureTextEntry />

                    <Input placeholder='Confirme a nova senha'
                        bg="gray.600"
                        secureTextEntry />

                    <Button mt={4} title='Atualizar' />
                </VStack>
            </ScrollView>
        </VStack>
    );
}