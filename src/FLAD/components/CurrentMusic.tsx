import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function CurrentMusic() {

  return (

    <View style={{
      width: 200,
      height: 200,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      // iOS
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 20,
      // Android
      elevation: 2,
    }}>
      <Animated.View style={[{
        width: 200,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        // iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        // Android
        elevation: 2,
      }, { overflow: 'hidden' }]}>
        <Animated.View />
      </Animated.View>
    </View>
  );
}

