import React from 'react';
import Favorite from '../screens/Favorite';
import { createStackNavigator } from '@react-navigation/stack';
import { ArtistLayout } from '../components/Genre';
import MusicDetail from '../screens/MusicDetail';
import InfoScreen from '../screens/testPage';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import CurrentMusic from '../components/CurrentMusic';

const Stack = createSharedElementStackNavigator();
export default function MusicNavigation() {
    return (
      <Stack.Navigator initialRouteName="Favorite" screenOptions={{gestureEnabled: true, headerShown: false, cardOverlayEnabled: true, cardStyle: {backgroundColor: "transparent"}}} >
        <Stack.Screen 
          name="Favorite" 
          component={Favorite} 
          
        />
        <Stack.Screen 
          name="MusicDetail" 
          component={MusicDetail} 
          sharedElements ={(route)=> {return [route.params.music.id]}}
        />
        <Stack.Screen 
            name="Genre" 
            component={CurrentMusic} 
          />
      </Stack.Navigator>
    )
  }