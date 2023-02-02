import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import Card from '../components/Card';

import { cards as cardArray } from '../FakeData/data'
import FladButton from '../components/button/button';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';
import { MY_SECURE_AUTH_STATE_KEY } from './login';

import * as Location from 'expo-location';


interface SpotProps {

}
type LocationData = {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface NearbyUser {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

async function getUserData(accessToken : string) {
   axios.get("https://api.spotify.com/v1/me",
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            "Content-Type" : "application/json"
         }})
        .then(response =>
        {
          if (response && response.statusText === 'success') {
          console.log(response.data.message);
          const userData = JSON.stringify(response.data);
          const userId = response.data.id;
          return {userId, userData}
        }
        })  
        .catch(function (error) {
          console.log(error);
        });
        
};  
// async function sendUserLoc(accessToken : string) {
//   axios.get("https://api.spotify.com/v1/me",
//        {
//          headers: {
//            'Authorization': 'Bearer ' + accessToken,
//            "Content-Type" : "application/json"
//         }})
//        .then(response =>
//        {
//          if (response && response.statusText === 'success') {
//          console.log(response.data.message);
//          const userData = JSON.stringify(response.data);
//          const userId = response.data.id;}

//        })  
//        .catch(function (error) {
//          console.log(error);
//        });
// };  

async function getValueFor(key:string) :Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    
    alert('No values stored under that key.');
  }
  return result;
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

  const hapti  = (() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    getValueFor(MY_SECURE_AUTH_STATE_KEY)
    .then(key => { (key != null) ? getUserData(key) :console.log("error key is nullll") } ) ;
      // Haptics.NotificationFeedbackType.Success
  });

////////////////////////////////////////////////////////////////
    const [locationData, setLocationData] = useState<LocationData>();
    const [prevLocationData, setPrevLocationData] = useState<LocationData>();
    const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
    const [currentMusic, setCurrentMusic] = useState<string>("");

    async function getLocation() {
      var { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocationData({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        timestamp: currentLocation.timestamp
      });
    }; 
    async function sendLocationToServer() {
      getLocation();
        if (!locationData) return;
        if (prevLocationData && locationData.latitude === prevLocationData.latitude && locationData.longitude === prevLocationData.longitude) {
          return;
        }
        try {
          const response = await axios.post(
            'http://localhost/api/users/david/nextToMe',
            locationData
          );

          if (response.status !== 200) {
            throw new Error('Failed to send location to server');
          }

          setPrevLocationData(locationData);
          setNearbyUsers(response.data);
        } catch (error) {
          console.error(error);
        }
    };
  
  setInterval(sendLocationToServer, 30000)
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
  
