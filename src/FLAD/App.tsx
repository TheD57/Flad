import { StatusBar } from 'expo-status-bar';
import { useState, useTransition } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import FavoritePage from './screens/favoritePage';
import { cards as cardArray } from './data/data'
import Navigation from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
const Stack = createBottomTabNavigator();
  return (

    /*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  position : 'absolute', backgroundColor : '' }}>
      {cards.map((card, index) => (
        <View key={card.name}>
          <Card
            title={card.name}
            image={card.sourceUrl}
            onSwipe={(direction) => onSwipe(index, direction)}
          />
        </View>
      ))}
    </View>*/

    <Navigation/>



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


