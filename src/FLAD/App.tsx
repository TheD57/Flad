import Navigation from './navigation/Navigation';
import {SafeAreaProvider,useSafeAreaInsets} from 'react-native-safe-area-context';
import StartNavigation from './navigation/StartNavigation';

export default function App() {

  return (
    
    <SafeAreaProvider>
      {/* <Navigation/> */}
      <StartNavigation/>
    </SafeAreaProvider>

  );
}


