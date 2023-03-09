import { useState } from 'react';
import { View, Text, Image, PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable, TextInput } from 'react-native'
import Animated, { interpolate, lessThan, multiply, useAnimatedStyle } from 'react-native-reanimated';
import HalfCirlce from './HalfCircle';

interface CircularProps {
  background: string,
  foreground: string,
  progress: Animated.Value<number>,
  radius: number;
}

const PI = Math.PI;
const FladInput = ({ background, foreground, progress }: CircularProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const theta = multiply(progress, 2 * PI);
  const rotateTop = theta;
  const opacity = lessThan(theta, PI);


  const rotateAnimation = useAnimatedStyle(() => {
    const rotate = interpolate
      (theta,
        [PI, 2 * PI],
        [0, PI]);

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { rotate: rotate },
        { translateX: RADUIS / 2 },
        { translateY: RADUIS / 2 }
      ],
    };
  });
  const rotateAnimation2 = useAnimatedStyle(() => {
    const rotate = interpolate
      (theta,
        [PI, 2 * PI],
        [0, PI]);

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { rotate: theta },
        { translateX: RADUIS / 2 },
        { translateY: RADUIS / 2 }
      ],
    };
  });
  return (
    <>
      <View style={{ zIndex: 1 }}>
        <HalfCirlce backgroundColor={background} />
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ rotate: '180%' }], opacity }}>
          <HalfCirlce backgroundColor={background} />
        </Animated.View>
      </View>
      <View style={{ transform: [{ rotate: '180%' }] }}>
        <HalfCirlce backgroundColor={background} />
        <Animated.View style={{}}>
          <HalfCirlce backgroundColor={background} />
        </Animated.View>        </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    placeholder: "placeholde"
  },
})

export default FladInput;