import React from 'react';
import Login from '../screens/LoginPage';
import Register from '../screens/Register';
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