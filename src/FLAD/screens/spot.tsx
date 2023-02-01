import { View, Text, Image, Animated ,PanResponder, Dimensions } from 'react-native'
import React, { useRef, useState, useTransition } from 'react'

import Card from '../components/Card';

import { cards as cardArray } from '../FakeData/data'

const {width : wWidht} = Dimensions.get("window");
const width = wWidht *0.75;
const height = wWidht * (465/264);
const borderRadius = 24;

interface SpotProps {
    title: string;
    image: any;
    onSwipe: (direction: "left" | "right") => void;
  }

  
    const Spot: React.FC<SpotProps> = ({ title, image, onSwipe }) => {
    const [cards, setCards] = useState(cardArray);
    const aIndex = useTransition();
    const onSwipe = (index: number, direction: 'left' | 'right') => {
    if (direction === 'right') {
        // Swiped right
        console.log('Swiped right');

    } else if (direction === 'left') {
        console.log('Swiped left');
    }
    // update the state of the card or the app
    setCards(cards.filter((_, i) => i !== index));
    };

// const [currentCard, setCurrentCard] = useState(0);

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  position : 'absolute', backgroundColor : '' }}>
      {cards.map((card, index) => (
        <View key={card.name}>
          <Card
            title={card.name}
            image={card.sourceUrl}
            onSwipe={(direction) => onSwipe(index, direction)}
          />
        </View>
      ))}
    </View>



    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   {/* <View>
    //     <Animated.View>
          
    //     </Animated.View>
    //     {cardArray.map( ({index}) => currentCard < index && step + step  && (
    //       <Card card={card} ></Card>

    //     )  )}
        
    //   </View> */}
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Card title="Swipe me left or right" />
    // </View>
    //   <StatusBar style="auto" />
    // </View>
  );
  };
  
  export default Spot;