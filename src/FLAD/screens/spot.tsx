import { View, Text, Image, PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';

import Card from '../components/Card';

import { cards as cardArray, spotArray2 } from '../data/data'
import FladButton from '../components/button/button';
import axios from 'axios';
import AdjustSize from '../components/AdjustSize';
import * as SecureStore from 'expo-secure-store';
import { MY_SECURE_AUTH_STATE_KEY } from './login';
import * as AuthSession from 'expo-auth-session';
import normalize from '../components/Normalize';
import * as Location from 'expo-location';
import Icons from '../assets/icons/icons/icon';
import LottieView from 'lottie-react-native'
import Lotties from '../assets/lottie/Lottie';
import FladLoading from '../components/FladLoadingScreen';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import Music from '../Model/Music';
import { addFavoritesMusic } from '../redux/actions/appActions';
import { useDispatch } from 'react-redux';
import { Spot } from '../Model/Spot';

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

async function getUserData(accessToken: string) {
  axios.get("https://api.spotify.com/v1/me",
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response && response.statusText === 'success') {
        console.log(response.data.message);
        const userData = JSON.stringify(response.data);
        const userId = response.data.id;
        return { userId, userData }
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

async function getValueFor(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {

    alert('No values stored under that key.');
  }
  return result;
}

export default function SpotPage() {
  const [cards, setCards] = useState(spotArray2);
  const [currentCard, setcurrentCard] = useState(cards[cards.length - 1]);
  const onSwipe = (index: number, direction: 'left' | 'right' | 'down') => {

    if (direction === 'right') {
      // Swiped right
      console.log("====2===" + currentCard.music.title + "======2=========");
      addLike(currentCard.music);
      console.log('Swiped right');
    } else if (direction === 'left') {
      // Swiped left
      console.log('Swiped left');
    }
    else if (direction === 'down') {
      // Swiped down
      console.log('Swiped down');
    }
    // update the state of the cards state when it remove this
    setTimeout(() => {
      setCards(cards.filter((_, i) => i !== index));
      setcurrentCard(cards[index - 1]);
    }, 3);
    // setCards(cards.filter((_, i) => i !== index));
    // setcurrentCard(cards[index-1]);
  };

  const likeButtonref = useRef<LottieView>(null);
  const dislikeButtonref = useRef<LottieView>(null);
  const discoveryButtonref = useRef<LottieView>(null);

  const onLike = useCallback(() => {
    likeButtonref.current?.reset();
    likeButtonref.current?.play(0, 55);
    likeButtonref.current?.play(55, 0);
  }, [])
  const dispatch = useDispatch();

  function addLike(music: Music) {
    onLike();
    console.log("====3===" + currentCard.music.title + "======3=========");

    dispatch(addFavoritesMusic(music))
    // dispatch(addFavoriteMusic(props));
    // if (displayIndex == trendingMovies.length - 1) {
    //     setdisplayIndex(0);
    //     swiper.swipeLeft();
    // }
  }



  // const hapti  = (() => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  //   getValueFor(MY_SECURE_AUTH_STATE_KEY)
  //   .then(key => { (key != null) ? getUserData(key) :console.log("error key is nullll") } ) ;
  //     // Haptics.NotificationFeedbackType.Success
  // });

  ////////////////////////////////////////////////////////////////
  //   const [locationData, setLocationData] = useState<LocationData>();
  //   const [prevLocationData, setPrevLocationData] = useState<LocationData>();
  //   const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  //   const [currentMusic, setCurrentMusic] = useState<string>("");

  //   async function getLocation() {
  //     var { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         console.log('Permission to access location was denied');
  //         return;
  //       }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     setLocationData({
  //       latitude: currentLocation.coords.latitude,
  //       longitude: currentLocation.coords.longitude,
  //       timestamp: currentLocation.timestamp
  //     });
  //   }; 
  //   async function sendLocationToServer() {
  //     getLocation();
  //       if (!locationData) return;
  //       if (prevLocationData && locationData.latitude === prevLocationData.latitude && locationData.longitude === prevLocationData.longitude) {
  //         return;
  //       }
  //       try {
  //         const response = await axios.post(
  //           'http://localhost/api/users/david/nextToMe',
  //           locationData
  //         );

  //         if (response.status !== 200) {
  //           throw new Error('Failed to send location to server');
  //         }

  //         setPrevLocationData(locationData);
  //         setNearbyUsers(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //   };

  // setInterval(sendLocationToServer, 30000)
  const navigator = useNavigation();

  const { width: wWidht } = Dimensions.get("window");
  const hapti = (card: Spot) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    navigator.navigate("DetailsSpot", { "music": card.music })
    // Haptics.NotificationFeedbackType.Success
  };
  return (

    <View style={{
      flex: 1,
    }}>
      {cards.length > 0 ? (
        <>
          <ImageBackground blurRadius={7}
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{
              uri: currentCard.music.image,
            }}
          ></ImageBackground>
          <SafeAreaView style={styles.mainSafeArea}>
            <LinearGradient colors={['rgba(2, 2, 2, 0.58) 0%', 'rgba(0, 0, 0, 0) 100.56%']} style={styles.gradient}>
              <Text
                style={{
                  fontStyle: 'normal',
                  left: wWidht / 9,
                  top: normalize(87),
                  color: "#FFFFFF",
                  fontSize: normalize(AdjustSize(currentCard.music.title)),
                  fontWeight: "800",
                }}>{currentCard.music.title}</Text>
              <Text
                style={{
                  fontStyle: 'normal',
                  left: wWidht / 9,
                  top: normalize(87),
                  color: "#FFFFFF",
                  fontSize: normalize(20),
                }}>{currentCard.music.bio}</Text>
            </LinearGradient>
          </SafeAreaView>
          <View style={{ flex: 8.35 }}>

            <View style={{ flex: 1.83, justifyContent: 'center', alignItems: 'center' }}>

              {cards.map((card, index) => (
                <View key={card.userSpotifyId} style={{ position: 'absolute' }} >

                  <Pressable onLongPress={() => { hapti(card) }} >
                    {/* <SharedElement id={card.name}> */}
                    <Card
                      title={card.music.title}
                      image={card.music.image}
                      onSwipe={(direction) => { onSwipe(index, direction) }}
                    />
                    {/* </SharedElement> */}
                  </Pressable>
                </View>
              ))
              }
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-start", justifyContent: 'center' }}>
              <Animated.View style={{ flexDirection: 'row', width: '92%', alignItems: "center", justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={styles.button} onPress={onLike}>
                  <LottieView autoPlay={false} loop={false} ref={likeButtonref} source={Lotties.likeAnimation} style={styles.lottie} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onLike}>
                  <LottieView autoPlay={false} loop={false} ref={likeButtonref} source={Lotties.likeAnimation} style={styles.lottie} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onLike}>
                  <LottieView autoPlay={false} loop={false} ref={likeButtonref} speed={2} source={Lotties.likeAnimation} style={styles.lottie} />
                </TouchableOpacity>

              </Animated.View>
            </View>

          </View>
        </>
      )
        : (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: "#141414" }}>
          <View style={{ position: "absolute" }}>
            <FladLoading />
          </View>
          <Text style={{ color: "grey", fontWeight: "400", textAlign: "center", top: 100 }}>Vous avez explorer toutes les spot autour de vous.
            {"\n"}Continuer dans discoverie pour découvrir de nouvelles music basées dur vos gouts musicaux.</Text>
        </View>)
      }
    </View>

  );
};
const styles = StyleSheet.create({
  mainSafeArea: {
    flex: 1,
  },
  spot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#000'
  },
  lottie: {
    width: '100%',
  },
  button: {
    setOpacityTo: 0.8,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    width: 61,
    height: 61,

    backgroundColor: '#24243A',
    opacity: 0.8,
    shadowRadius: 2,

  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 209,
  },
})

