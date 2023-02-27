import React from 'react';
import Favorite from '../screens/Favorite';
import { createStackNavigator } from '@react-navigation/stack';

export default function MusicNavigation() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="Favorite">
        <Stack.Screen 
          name="Favorite" 
          component={Favorite} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }