import Navigation from './navigation/Navigation';
import { StyleSheet,SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartNavigation from './navigation/StartNavigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AuthNavigation from './navigation/AuthNavigation';

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