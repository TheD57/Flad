import Navigation from './navigation/Navigation';
import { StyleSheet,SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartNavigation from './navigation/StartNavigation';

export default function App() {

  return (
    <SafeAreaProvider>
        <StartNavigation/>
    </SafeAreaProvider>
    // <SafeAreaView style={styles.mainSafeArea}>
    //   {/* <Navigation/> */}
    // </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  mainSafeArea: {
    flex: 1,
    backgroundColor: "#141414",
  }
});