import { View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const size = 100
const FladLoading = () => {

  const progresse = useSharedValue(1);


  useEffect(() => {
    // withTiming, withSpring
    progresse.value = withRepeat(withTiming(0.01, { duration: 750 }), -1, true);
  }, [progresse]);


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

    </View>
  );
};

export default FladLoading;

