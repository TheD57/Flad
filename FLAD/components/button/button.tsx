import { View, Text, Image , Dimensions, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated,{ Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Icons from '../../assets/icons/icon';
import Rive, { Fit, RiveRef } from 'rive-react-native';

const {width : wWidht} = Dimensions.get("window");
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
// const width = wWidht *0.75;
// const height = wWidht * (465/264);
// const borderRadius = 24;
interface ButtonProps {
    name : string;
}
  
const FladButton = ({name} : ButtonProps) => {
    const riveRef = React.useRef<RiveRef>(null);

    const handlePlay = () => { riveRef.current?.play() };
    return (
        <Pressable onPress={handlePlay}> 
        <Image source={Icons.discovery} style={[styles.image]} />
      </Pressable>
    );
  };
  
const styles = StyleSheet.create({
  button : {
    justifyContent : 'center',
    alignItems : 'center',
  },
  image : {
    borderRadius : 24,
    resizeMode: 'cover',
    width: 65,
    height: 65,
    backgroundColor: 'black',
}
})

export default FladButton;




