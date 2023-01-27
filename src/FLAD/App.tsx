import { StatusBar } from 'expo-status-bar';
import { useState, useTransition } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';

import { cards as cardArray } from './FakeData/data'

 
export default function App() {
//  const [currentCard, setCurrentCard] = useState(cardArray);
//  const aIndex = useTransition(currentCard)
// ;
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius : 8,
    shadowRadius : 20,
    shadowColor : '#'
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    resizeMode : "cover",
    placeholder: "assets/images/loadingPlaceholder.gif"
  },
});