import React from 'react';
import Login from '../screens/LoginPage';
import Register from '../screens/Register';
import Onboarding from '../components/Onboarding';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { getRefreshToken } from '../redux/thunk/authThunk';
import { ArtistLayout } from '../components/Genre';

export default function StartNavigation() {
  // //@ts-ignore
  // const appIsReady : boolean = useSelector(state => state.userReducer.loading);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function prepare() {
  //       //@ts-ignore
  //     await dispatch(getRefreshToken());
  //   }
  //   prepare();
  // }, [dispatch]);

  // const onStackRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}