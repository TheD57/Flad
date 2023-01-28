import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable } from 'react-native'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import Card from '../components/Card';

import { cards as cardArray } from '../FakeData/data'

interface SpotProps {
}
const Spot: React.FC<SpotProps> = () => {
  
  const [cards, setCards] = useState(cardArray);
  const onSwipe = (index: number, direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Swiped right
      console.log("===================")
    } else if (direction === 'left') {
      // Swiped left
    }
    // update the state of the card or the app
    setCards(cards.filter((_, i) => i !== index));
  };

  const hapti = (() => {
  
      // Haptics.NotificationFeedbackType.Success
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        });

  return (

    <View style={styles.spot}>
      
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
        <Button
          title="Success"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }
        />
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
  
  export default Spot;