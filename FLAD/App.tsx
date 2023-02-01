import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState, useTransition } from 'react';
import { Animated, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import Login from './pages/login';
import Spot from './pages/spot';



export default function App() {
  //  const [currentCard, setCurrentCard] = useState(cardArray);
  //  const aIndex = useTransition(currentCard)
  // ;

// const aIndex = useTransition();
// const onSwipe = (index: number, direction: 'left' | 'right') => {
//   if (direction === 'right') {
//     // Swiped right
//     console.log('Swiped right');

//   } else if (direction === 'left') {
//     console.log('Swiped left');
//   }
//   // update the state of the card or the app
//   setCards(cards.filter((_, i) => i !== index));
// };

// const [currentCard, setCurrentCard] = useState(0);
const {width : wWidht} = Dimensions.get("window");

  return (
    

    <View style={styles.container}>


      <LinearGradient colors={['rgba(2, 2, 2, 0.58) 0%','rgba(0, 0, 0, 0) 90.56%']}style={styles.gradient}>
      <Text
      style={{
        fontStyle : 'normal',
        left: wWidht/9 ,
        top: 65,
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "800",
      }}>LOST FOREST</Text>
      <Text
      style={{
        fontStyle : 'normal',
        left: wWidht/9 ,
        top: 65,
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "800",
      }}>Laylow</Text>
      </LinearGradient>
      
      <Login></Login>
      {/* <Spot/> */}

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
    backgroundColor: '#000',
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
      gradient : {
        position : "absolute",
        top : 0,
        left : 0,
        right : 0,
        height : 209,
      }
});
