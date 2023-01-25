import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { eventMethod } from '@ionic/core/dist/types/utils/overlays';


const {width : wWidht} = Dimensions.get("window");
const width = wWidht *0.75;
const height = wWidht * (465/264);
const borderRadius = 24;

interface CardProps {
    title: string;
    image: any;
    onSwipe: (direction: "left" | "right") => void;
  }

//   const [loading, setLoading] = useState(true);
//   const [cards, setCards] = useState(cardArray);

// useEffect(()=>{
//   setLoading(true);
//   eventMethod().then(
//     setLoading(false);
//   )
// })
  
  const Card: React.FC<CardProps> = ({ title, image, onSwipe }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Only set the pan responder if the user has moved the card more than a certain threshold
          if (Math.abs(gestureState.dx) > 10) {
            return true;
          }
          return false;
        },
        onPanResponderMove: (evt, gestureState) => {
          // Update the position of the card as the user swipes it
          pan.setValue({ x: gestureState.dx, y: 0 });
          console.log("Card");
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Handle the swipe action based on the swipe direction
          if (gestureState.dx > 50) {
            onSwipe("right");
          } else if (gestureState.dx < -50) {
            onSwipe("left");
          } else {
            // Swiped a small amount, reset the position of the card
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;
    
    return (
      <View>
        <Animated.View
          style={{ transform: [{ translateX: pan.x  }], backgroundColor : 'red'}}
          {...panResponder.panHandlers} 
        >
          <Image source={{uri : image}} style={{ width: 200, height: 200 }} />
        </Animated.View>
      </View>
    );
  };
  

const nournous = StyleSheet.create({

})


  export default Card;




