import React, {Component} from 'react';
import LoginPage from '../screens/loginPage';
import InscriptionPage from '../screens/InscriptionPage';
import Onboarding from '../components/Onboarding';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function StartNavigation() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Onboarding} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginPage} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Inscription" 
            component={InscriptionPage} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }