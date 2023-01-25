import { StatusBar } from 'expo-status-bar';
import { useState, useTransition } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

// import { cards as cardArray } from './FakeData/data'

 
export default function App() {

  return (
    <View>
      
    </View>
    
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
});
