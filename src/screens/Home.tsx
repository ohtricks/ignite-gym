import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { HStack, VStack, FlatList, Heading, Text } from 'native-base';
import { useState } from 'react';

export function Home(){
    const [groups, setGroups] = useState(['costas', 'biceps', 'triceps', 'ombro']);
    const [exercises, setExercises] = useState(['1','2', '3','4','5','6','7']);
    const [groupSelected, setGroupSelected] = useState('costas');

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExercisesDetails(){
        navigation.navigate('exercise');
    }

    return(
        <VStack flex={1}>
            <HomeHeader />

            <FlatList 
                data={groups}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => (
                    <Group name={item} isActive={item === groupSelected}
                        onPress={() => setGroupSelected(item)} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{px: 8}}
                my={10}
                maxH={10}
                minH={10}
            />

            <VStack px={8} flex={1}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercícios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        {exercises.length}
                    </Text>
                </HStack>
                
                <FlatList
                    data={exercises}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <ExerciseCard 
                            onPress={handleOpenExercisesDetails} />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{paddingBottom: 20}} />
            </VStack>
        </VStack>
    );
}