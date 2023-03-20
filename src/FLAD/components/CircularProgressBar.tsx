import { View, StyleSheet } from 'react-native'
import Animated, { lessThan, multiply } from 'react-native-reanimated';
import HalfCirlce from './HalfCircle';

interface CircularProps {
  background: string,
  foreground: string,
  progress: Animated.Value<number>,
  radius: number;
}

const PI = Math.PI;
const FladInput = ({ background, foreground, progress }: CircularProps) => {
  const theta = multiply(progress, 2 * PI);
  const opacity = lessThan(theta, PI);

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
        <Animated.View>
          <HalfCirlce backgroundColor={background} />
        </Animated.View>        
      </View>
    </>
  );
};

export default FladInput;