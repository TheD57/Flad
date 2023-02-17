import Navigation from './navigation/Navigation';
import LoginPage from './screens/loginPage';
import {SafeAreaProvider,useSafeAreaInsets} from 'react-native-safe-area-context';
import Onboarding from './components/Onboarding';

export default function App() {

  return (
    <Onboarding/>
    //<LoginPage/>
    // <SafeAreaProvider>
    //   {/* <Navigation/> */}
    // </SafeAreaProvider>

  );
}


