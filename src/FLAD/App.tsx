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


export default function App() {

const Stack = createBottomTabNavigator();

  return (
    
      <Navigation/>

  );
}


