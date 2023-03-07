import React, {Component} from 'react';
import FavoritePage from '../screens/favorite';
import { createStackNavigator } from '@react-navigation/stack';
import SpotPage from '../screens/spot'
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import SpotDetailsPage from '../screens/SpotDetailsPage';
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
        {/* <Stack.Screen 
          name="DetailsSpot" 
          component={SpotDetailsPage} 
          sharedElements={(route) => {
           return [route.params.spot.name]
          }}
        /> */}
      </Stack.Navigator>
    )
  }