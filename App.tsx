import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import Logo from './src/assets/logo.svg';
import { Loading } from '@components/Loading';
import { THEME } from 'src/theme';
import { SignIn } from '@screens/signin';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}