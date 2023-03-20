import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 480;

// @ts-ignore
export default function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3
  }
}