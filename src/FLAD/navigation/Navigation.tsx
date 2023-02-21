import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/spot';
import FavoritePage from '../screens/favoritePage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Spot from '../screens/spot';

export default function StackNavigation() {
    const Stack = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          
        }} >
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Favoris" 
            component={FavoritePage} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Settings" 
            component={FavoritePage} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

