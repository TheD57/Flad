import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SpotPage from '../screens/spot'
import MusicDetail from '../screens/MusicDetail';


export default function SpotNavigation() {
  // const Stack = createSharedElementStackNavigator();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,

    }}
    >
      <Stack.Screen
        name="Spots"
        component={SpotPage}
      />
      <Stack.Screen
        name="DetailsSpot"
        component={MusicDetail}
      />
    </Stack.Navigator>
  )
}