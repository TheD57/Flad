import React from 'react';
import Favorite from '../screens/Favorite';
import { createStackNavigator } from '@react-navigation/stack';
import { ArtistLayout } from '../components/Genre';
import MusicDetail from '../screens/MusicDetail';

export default function MusicNavigation() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="Favorite">
        <Stack.Screen 
          name="Favorite" 
          component={Favorite} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MusicDetail" 
          component={MusicDetail} 
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