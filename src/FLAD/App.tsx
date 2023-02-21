import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState, useTransition } from 'react';
import FavoritePage from './screens/favoritePage';
import { cards as cardArray } from './data/data'
import Navigation from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
// import Login from './screens/login';
import Spot from './screens/spot';
import StackNavigation from './navigation/Navigation';



export default function App() {

const Stack = createBottomTabNavigator();
const {width : wWidht} = Dimensions.get("window");

  return (
    
<StackNavigation/>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    card: {
      borderRadius : 8,
      shadowRadius : 20,
      shadowColor : '#'
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
        resizeMode : "cover",
        placeholder: "assets/images/loadingPlaceholder.gif"
      },
      gradient : {
        position : "absolute",
        top : 0,
        left : 0,
        right : 0,
        height : 209,
      }
});