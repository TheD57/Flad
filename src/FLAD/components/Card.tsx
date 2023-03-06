import { View, Image , Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Animated,{ Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

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
  
const Card = ({ title, image, onSwipe } : CardProps) => {
    
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
      onStart : (event, context)  => {
        context.translateX = translateX.value;
        context.translateY = translateY.value;
      },
      onActive : (event, context)  => {
        translateX.value = event.translationX + context.translateX;
        translateY.value = event.translationY + context.translateY;
    
      },
      onEnd : (event, context)  => {
        console.log(translateX.value - translateY.value);
        // console.log(translateY.value);
        // translateX.value = withSpring(0);
        // translateY.value = withSpring(snapPoint(translateY.value,velocityY, snapPoints ))
        if (translateX.value > 160) {
          console.log("translateX2");
         runOnJS(onSwipe)("right");
        } else if (translateX.value < -160) {
          runOnJS(onSwipe)("left");
          // onSwipe("left");
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
        [ 0,0, 1]);
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
          [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
          [0.35, 0, 0.35]);

          return {
            opacity : opacityl,
          };
        });
       
        const opacDStyle = useAnimatedStyle(() => {
          const opacityl = interpolate
          ( translateY.value,
            [ 100, 300],
            [ 0, 1]);
            
            return {
              backgroundColor : 'red',
              opacity : opacityl,
            };
          });
          
const  horizontalThreshold = SCREEN_WIDTH * 0.65;

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
          const styleCardsNew = useAnimatedStyle(() => {
            const factor = 1;
            const rot = interpolate
            ( translateX.value,
              [0, factor * horizontalThreshold],
              [0, 15],
              );
             
              return {
                transform: [
                  { scale: scale.value },
                  { translateX: translateX.value },
                  { translateY: translateY.value },
                  { rotateZ: `${rot}deg` },
                ]
  
              };
            });


             // Calculate the distance of the card from its starting position
       
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
    console.log('==========================================',SCREEN_WIDTH/4 , "===============================");
    return (
      <View>
         <PanGestureHandler onGestureEvent={onGestureEvent}>
        
        <Animated.View style={[ styleCardsNew, styles.container]}>
        <Animated.View style={[  styles.image,{backgroundColor: 'black',elevation: 100,
                    position: "absolute",borderWidth : 8, borderColor : '#DA1D1D',
                    zIndex: 1000,}, opacCStyle]}>
        </Animated.View>
        <Image source={{uri : image}} style={[styles.image]} />
        <>
        <Animated.View
                  style={[{
                    // transform: [{ rotate: "30deg" }],
                    
                    elevation: 100,
                    position: "absolute",
                    zIndex: 1000,
                  },opacRStyle]}
                >
                  <Image style={[{alignSelf : "center"}]}
                  source={require('../assets/icons/icons/icon_dislike.png')}  
                  />
            </Animated.View>
            <Animated.View
                  style={[{
                    width: '100%',
                    height: '100%',
                    position: "absolute",
                    justifyContent : "center",
                    alignContent : "center",
                    zIndex: 1000,
                    elevation: 100,
                  },opacLStyle]}
                >
                  <Image style={[{alignSelf : "center"}]}
                  source={require('../assets/icons/icons/icon_like.png')}
                    
                  />
            </Animated.View>
            <Animated.View
                  style={[{
                    width: '100%',
                    height: '100%',
                    position: "absolute",
                    justifyContent : "center",
                    alignContent : "center",
                    elevation: 100,
                    zIndex: 1000,
                  },opacDStyle]}
                >
                  <Image style={[{alignSelf : "center",width: 126.27,
                    height: 118.64, }]}
                  source={require('../assets/icons/icons/icon_discovery.png')}
                    
                  />
            </Animated.View>
            </>
            
        </Animated.View>     
         </PanGestureHandler>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  card : {
    justifyContent : 'center',
    alignItems : 'center',
  },
  image : {
    borderRadius : 24,
    resizeMode: 'stretch',
    height: 362,
    width: 362,
},
container: {
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}
})

export default Card;

