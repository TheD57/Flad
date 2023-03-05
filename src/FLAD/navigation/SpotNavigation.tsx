import React, {Component} from 'react';
import FavoritePage from '../screens/favoritePage';
import { createStackNavigator } from '@react-navigation/stack';
import Spot from '../screens/spot'
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import SpotDetailsPage from '../screens/SpotDetailsPage';


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
          component={Spot} 
        />
        <Stack.Screen 
          name="DetailsSpot" 
          component={SpotDetailsPage} 
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