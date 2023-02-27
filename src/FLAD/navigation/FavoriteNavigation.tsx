import React, {Component} from 'react';
import FavoritePage from '../screens/favoritePage';
import { createStackNavigator } from '@react-navigation/stack';
import { ArtistLayout } from '../components/Genre';

export default function MusicNavigation() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="FavoritePage">
        <Stack.Screen 
          name="FavoritePage" 
          component={FavoritePage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="Genre" 
            component={ArtistLayout} 
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    )
  }