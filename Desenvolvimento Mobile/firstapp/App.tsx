import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { HomeScreen } from './src/screens';
import { COLORS } from './src/constants';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HomeScreen />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
