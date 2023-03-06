import Navigation from './Navigation';
import { StyleSheet,SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartNavigation from './StartNavigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { getRefreshToken } from '../redux/thunk/authThunk';

SplashScreen.preventAutoHideAsync();

export default function AuthNavigation() {
    //@ts-ignore
  const appIsReady : boolean = useSelector(state => state.userReducer.loading);
  //@ts-ignore
  const isLogin : boolean = useSelector(state => state.userReducer.isLogedIn);
  // const userToken : string = useSelector(state => state.userReducer.userFladToken);

  const dispatch = useDispatch();

  useEffect(() => {
    async function prepare() {
      console.log(appIsReady, "1 AuthNav")

        //@ts-ignore
      await dispatch(getRefreshToken())
      await SplashScreen.hideAsync();
    }
    prepare();
  }, [dispatch]);

  const onStackRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (appIsReady == false) {
    console.log(appIsReady, "T9 AuthNav")
    return null;
  }
  console.log(appIsReady, "k9 AuthNav")
  // console.log(userToken, "k9 AuthNav")
    return (
        <>
                 {isLogin ? (
         /* {userToken != null ? ( */
        <SafeAreaProvider>
            <Navigation/>
        </SafeAreaProvider>
    
        ) : 
        <SafeAreaProvider >
            <StartNavigation/>
        </SafeAreaProvider>
        }
    </>
    )
  }
