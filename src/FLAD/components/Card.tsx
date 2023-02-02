import { View, Text, Image , Dimensions, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated,{ Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

const {width : wWidht} = Dimensions.get("window");
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
// const width = wWidht *0.75;
// const height = wWidht * (465/264);
// const borderRadius = 24;
interface CardProps {
    title: string;
    image: any;
    onSwipe: (direction: "left" | "right") => void;
  }
  type ContextType = {
    translateX: number;
    translateY: number;
  };
  
const Card = ({ title, image, onSwipe} : CardProps) => {
    
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  
    const hapti = (() => {
  
      // Haptics.NotificationFeedbackType.Success
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        });
    const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
      onStart : (event, context)  => {
        context.translateX = translateX.value;
        context.translateY = translateY.value;
      },
      onActive : (event, context)  => {
        translateX.value = event.translationX + context.translateX -5;
        translateY.value = event.translationY + context.translateY;
      },
      onEnd : (event, context)  => {
        // translateX.value = withSpring(0);
        // translateY.value = withSpring(snapPoint(translateY.value,velocityY, snapPoints ))
        if (translateX.value > 160) {
          hapti()
          onSwipe("right");
        } else if (translateX.value < -160) {
          onSwipe("left");
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }

      },
    });
    

//better to have 2 listerner => 2 useAnimatedStyle ou faire une ftc qui retourne l'verse de une useAnimatedStyle
    const opacLStyle = useAnimatedStyle(() => {
      const opacityl = interpolate
      ( translateX.value,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
        [0, 0, 1]);
        return {
          opacity : opacityl,
        };
      });
      const opacRStyle = useAnimatedStyle(() => {
        const opacityl = interpolate
        ( translateX.value,
          [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 2],
          [1, 0, 0]);
         

          return {
            opacity : opacityl,
          };
        });

      const opacCStyle = useAnimatedStyle(() => {
        const opacityl = interpolate
        ( translateX.value,
          [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 4],
          [0.85, 1, 1]);

          return {
            opacity : opacityl,
          };
        });
        const opacDStyle = useAnimatedStyle(() => {
          const opacityl = interpolate
          ( translateY.value,
            [-SCREEN_HEIGHT / 4, 0, SCREEN_HEIGHT / 4],
            [0, 0, 1]);
            return {
              opacity : opacityl,
            };
          });

        const rotateStyle = useAnimatedStyle(() => {
          const rot = interpolate
          ( translateX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [30, 0, 30],
            Extrapolate.CLAMP);
            return {
              transform: [{ rotate: `${rot}deg` },{
                translateX: withSpring(translateX.value),
              } ],

            };
          });
    
    const rStyle = useAnimatedStyle(() => {
      
      return {
        transform: [
          {
            translateX: translateX.value,
          },
          {
            translateY: translateY.value,
          },
        ],
      };
    });
    
    return (
      <View>
         <PanGestureHandler onGestureEvent={onGestureEvent}>
        
        
        <Animated.View style={[ rStyle, styles.card,opacCStyle, ]} >
        <Animated.View
                  style={[{
                    // transform: [{ rotate: "30deg" }],
                    position: "absolute",
                    zIndex: 1000,
                  },opacRStyle]}
                >
                  <Image style={[{alignSelf : "center"}]}
                  source={require('../assets/icons/icon_dislike.png')}  
                  />
            </Animated.View>
            <Animated.View
                  style={[{
                    position: "absolute",
                    justifyContent : "center",
                    alignContent : "center",
                    zIndex: 1000,
                  },opacLStyle]}
                >
                  <Image style={[{alignSelf : "center"}]}
                  source={require('../assets/icons/icon_like.png')}
                    
                  />
            </Animated.View>
            <Animated.View
                  style={[{
                    position: "absolute",
                    justifyContent : "center",
                    alignContent : "center",
                    
                    zIndex: 1000,
                  },opacDStyle]}
                >
                  <Image style={[{alignSelf : "center",width: 126.27,
                    height: 118.64, }]}
                  source={require('../assets/icons/icon_discovery.png')}
                    
                  />
            </Animated.View>
          <Image source={{uri : image}} style={[styles.image]} />
        </Animated.View>
         </PanGestureHandler>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  card : {
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : 'red',
                    borderWidth : 3,
  },
  image : {
    borderRadius : 24,
    resizeMode: 'cover',
    height: 529,
    width: 312,
    backgroundColor: 'black',
}
})


  export default Card;




