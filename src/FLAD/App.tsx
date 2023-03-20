import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthNavigation from './navigation/AuthNavigation';
import * as SplashScreen from 'expo-splash-screen';
import SpotifyService from './services/spotify/spotify.service';

SplashScreen.preventAutoHideAsync();

export default function App() {
  
  return (
    <Provider store={store}>
      <AuthNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainSafeArea: {
    flex: 1,
    backgroundColor: "#141414",
  }
});
export const theService = new SpotifyService('BQC0rAGJvxTt4-24P-nda6qP9iXYCql2eApnUAoEbZZkKemJ11cU3Nx-I_tKVX0FwEgFbIbSIuaVvxOapRVJq2z1Htyy3XQ5jIYNsrhrnp3KTCfppamAjxgDTf6khBrNGTxe6CNKBsMhc5IRnphey5Td2zJPvGMwnFFfMQdCtVAVsCNK7kPKlCAaf_kRMAoPn30Qk4RD45XmwtZIwQg7X0J4beGuHSiBf0MRjhsnFEW89GxVm8YuIVwgrDbF3izfPR0AlqS4IMJT5m4pEA72lYEwp1JnSDVsafILzmksaqG-11H3WAsWIENrOIu_j7qNgbvYwmUWXOrYmeWBkQ');
