import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { Center, Heading, SectionList, Text, VStack } from 'native-base';
import { useState } from 'react';

export function History(){
    const [exercises, setExercises] = useState([
        {
            title: '26.08.22',
            data: ['puxada', 'remada']
        },
        {
            title: '23.08.22',
            data: ['teste']
        }
    ]);
    return(
        <VStack>
            <ScreenHeader title="Histórico de Exercicio" />

            <SectionList
                px={8}
                sections={exercises}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
                renderItem={({item}) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({section}) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                        {section.title}
                    </Heading>
                )}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Não há exercicios registrados ainda.{'\n'}
                        Vamos fazer exercicios hoje?
                    </Text>
                )} />
        </VStack>
    );
}