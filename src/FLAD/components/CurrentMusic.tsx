// import React, { useEffect, useRef } from 'react';
// import { StyleSheet, Text, View , Image } from 'react-native';
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// import { SharedElement } from 'react-navigation-shared-element';
// import { useSelector } from 'react-redux';

// import normalize from '../components/Normalize';
// import SpotifyService from '../services/spotify/spotify.service';



// export default function CurrentMusic() {
// const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: withTiming(139.929, { duration: 1000 }) }
//       ]
//     }
//   });
//   const centerX = useSharedValue(0);
//   const centerY = useSharedValue(0);
//   const scale = useSharedValue(0);
//   const width = useSharedValue(0);
//   const height = useSharedValue(0);
//   const rippleOpacity = useSharedValue(1);
//   const rStyle = useAnimatedStyle(() => {
//     const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

//     const translateX = centerX.value - circleRadius;
//     const translateY = centerY.value - circleRadius;

//     return {
//       width: circleRadius * 2,
//       height: circleRadius * 2,
//       borderRadius: circleRadius,
//       opacity: rippleOpacity.value,
//       backgroundColor: 'rgba(0,0,0,0.2)',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       transform: [
//         { translateX },
//         { translateY },
//         {
//           scale: scale.value,
//         },
//       ],
//     };
//   });

//   useEffect(() => {
//     // withTiming, withSpring
//     rippleOpacity.value = 1;
//     scale.value = withTiming(1, { duration: 1000 });
//   }, [rippleOpacity,scale]);
//   return (

//     <View style={{
//         width: 200,
//         height: 200,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 25,
//         // iOS
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 0 },
//         shadowRadius: 20,
//         // Android
//         elevation: 2,
//       }}>
//       <Animated.View style={[{
//     width: 200,
//     height: 200,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 25,
//     // iOS
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 0 },
//     shadowRadius: 20,
//     // Android
//     elevation: 2,
//   }, { overflow: 'hidden' }]}>
//         <Animated.View style={rStyle} />
//       </Animated.View>
//   </View>
//   );
// }


import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';

import normalize from '../components/Normalize';
import SpotifyService from '../services/spotify/spotify.service';



export default function CurrentMusic() {
  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });


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
        <Animated.View style={rStyle} />
      </Animated.View>
    </View>
  );
}

