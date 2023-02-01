import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable } from 'react-native'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import Card from '../components/Card';

import { cards as cardArray } from '../FakeData/data'
import FladButton from '../components/button/button';

interface SpotProps {

}
export default function Spot() {
  const [cards, setCards] = useState(cardArray);
  const [currentCard, setcurrentCard] = useState(cards[cards.length - 1]);
  const onSwipe = (index: number, direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Swiped right
      console.log("===================")
    } else if (direction === 'left') {
      // Swiped left
    }
    // update the state of the cards state when it remove thisy
    setCards(cards.filter((_, i) => i !== index));
    setcurrentCard(cards[cards.length -1]);
  };

  const hapti = (() => {
  
      // Haptics.NotificationFeedbackType.Success
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        });

  return (


    <View style={styles.spot}>
      <ImageBackground blurRadius={20}
                             style={{
                                 position: 'absolute',
                                 width: "120%",
                                 height: "120%",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 opacity: 0.28
                             }}
                             source={{
                                 uri:currentCard.sourceUrl ,
                             }}
            ></ImageBackground>
      
      {cards.map((card, index) => (
        

        <View key={card.name} style = {{    position:'absolute'
      }} >
        
        <Pressable onLongPress={hapti}>

          <Card
            title={card.name}
            image={card.sourceUrl}
            onSwipe={(direction) => onSwipe(index, direction)}
          />
        </Pressable>
        {/* <Button
          title="Success"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }
        ></Button> */}
        <FladButton name="discovery"/>
        </View>
      ))}

    
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        
      /> */}
      
      </View>
      
  );
  };
  const styles = StyleSheet.create({
    spot : {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
  
