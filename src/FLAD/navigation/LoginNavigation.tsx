import React, {Component} from 'react';
import LoginPage from '../screens/loginPage';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './Navigation';

export default function LoginNavigation() {
    const Stack = createStackNavigator();
    console.log("je suis ici");
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Navigation} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }