import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

const { width: wWidht } = Dimensions.get("window");
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
// const width = wWidht *0.75;
// const height = wWidht * (465/264);
// const borderRadius = 24;

const size = 100
const FladLoading = () => {

  const progresse = useSharedValue(1);


  useEffect(() => {
    // withTiming, withSpring
    progresse.value = withRepeat(withTiming(0.01, { duration: 750 }), -1, true);
  }, [progresse]);

  const breatheStyle = useAnimatedStyle(() => {
    const borderRange = interpolate
      (progresse.value,
        [0, 1],
        [(0 * size) / 2, (1 * size) / 2],
      );
    return {
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      shadowColor: "#DA1D1D",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: borderRange,
    };
  });
  const breatheStyle2 = useAnimatedStyle(() => {
    const borderRange = interpolate
      (progresse.value,
        [0, 1],
        [(0 * size) / 2, (1 * size) / 2],
      );
    return {

      borderRadius: borderRange,

    };
  });

  const breatheStyleSquare = useAnimatedStyle(() => {
    const borderRange = interpolate
      (progresse.value,
        [0, 1],
        [(size + 20), (size)],
      );
    return {

      width: borderRange,
      height: borderRange,
      borderRadius: borderRange / 2,
      borderWidth: size / 10,
      borderColor: "#F80404",
      shadowColor: "#F40C1C",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
    };
  });



  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

      <Animated.View style={[{ backgroundColor: '#B40404', justifyContent: 'center', alignItems: 'center' }, breatheStyleSquare]}>
        <Animated.Image source={require('../assets/icons/icon.png')} style={[{ height: size, width: size, borderColor: '#fff', borderRadius: size / 2 }]} />
      </Animated.View>
      {/* <Animated.View style={[ {backgroundColor : 'green'},breatheStyleSquare]}>
        </Animated.View> */}

      {/* <Image source={require('../assets/icons/Spotify_-_Animation_1.gif')}/> */}

    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 24,
    resizeMode: 'stretch',

  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default FladLoading;

