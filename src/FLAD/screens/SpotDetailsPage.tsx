import { SharedElement } from "react-navigation-shared-element";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Dimensions, useWindowDimensions, Button, TouchableOpacity, SafeAreaView } from "react-native";
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, useDerivedValue, useSharedValue, Value, withSpring, withTiming } from "react-native-reanimated";
import { BlurView } from 'expo-blur';
import qs from "qs";
import axios from "axios";
import { Buffer } from 'buffer';
import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { RequestHandler } from "../services/spotify/spotifyRequestHandler/utils";
import { FetchRequest } from "expo-auth-session/build/Fetch";
import { theService } from "../App";

interface SpotProps {
  spot: { name: string, sourceUrl: string, index: number };
}
const halfPi = Math.PI / 2;

// const {width : wWidht} = Dimensions.get("window");
//@ts-ignore
const SpotDetailsPage = ({ route }) => {
  const { width, height } = useWindowDimensions();
  console.log(route);

  const spot: { name: string, sourceUrl: string, index: number } = route.params.spot;
  const [currentspot, setCurrentspot] = useState(spot);
  const [sound, setSound] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const loader = useSharedValue(0);
  useEffect(() => {
    loader.value = isPlaying ? 1 : 0
  }, [isPlaying, loader]);

  const transition = useDerivedValue(() => {
    return withTiming(loader.value, { duration: 1000 })
  }
  )


  // const styleAniamatedButton = useAnimatedStyle(() => {
  //     const verticalAxis =interpolate(
  //         transition.value,
  //         [0,1],
  //         [circumference, 0]
  //     )

  //     return {
  //         top : withSpring( verticalAxis),
  //         left : withSpring(horizontalAxis),
  //     };

  // })


  const trackPreviewUrl = 'https://p.scdn.co/mp3-preview/08ef3b9d6dbd6bab233f5e9ca564091902767f71?cid=774b29d4f13844c495f206cafdad9c86';
  const playTrackPreview = async () => {
    console.log("===============================================================================================================");

    console.log('get in  Sound');

    const { sound } = await Audio.Sound.createAsync({ uri: trackPreviewUrl });
    //@ts-ignore
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true);


    // const soundObject = new Audio.Sound();
    // try {
    //   await soundObject.loadAsync({ uri: trackPreviewUrl });
    //   await soundObject.playAsync();
    //   setIsPlaying(true);
    // } catch (error) {
    //   console.log('Error loading sound:', error);
    // }
  };

  const handlePlaySound = async () => {
    if (sound === null) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: trackPreviewUrl },
        { shouldPlay: true }
      );
      setSound(newSound);

    } else {
      //@ts-ignore
      await sound.playAsync();
    }
  };

  const handleStopSound = async () => {
    if (sound !== null) {
      //@ts-ignore
      await sound.stopAsync();
    }
    else {
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    return sound ? () => {
      console.log('Unloading Sound');
      //@ts-ignore
      sound.unloadAsync();
    }
      : undefined;
  }, [sound]);
  // useEffect(() => {
  //     if(isPlaying){

  //     }
  // })

  console.log(spot);
  const sensor = useAnimatedSensor(SensorType.ROTATION);
  const styleAniamatedImage = useAnimatedStyle(() => {
    const { yaw, pitch, roll } = sensor.sensor.value;
    const verticalAxis = interpolate(
      pitch,
      [-halfPi, halfPi],
      [-45, 45]
    )
    const horizontalAxis = interpolate(
      roll,
      [-halfPi * 2, halfPi * 2],
      [-45, 45]
    )
    return {
      top: withSpring(verticalAxis),
      left: withSpring(horizontalAxis),
    };

  })
  const CLIENT_ID = "1f1e34e4b6ba48b388469dba80202b10";
  const CLIENT_SECRET = "779371c6d4994a68b8dd6e84b0873c82";
  const spotify = "BQA2IAFZ-7ta4-_4_Uqdcdrqi_peE6Hlf1jwxFqjXTbwes0z8xgVGx0rE3zv4cQlusd1ILJhRwkxzPsL1YakzSvCxaTI1P7kOzBrrMqlkDgk4vlFvzLjScB0hBLULbpZyn3ylgx4RyZBEWfmc24wZPQOsrJU58AYCveA52UxYVSIc_Frr7LZyRmwjzGB68MPZeBD"
  var authOptions = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/player/currently-playing',

    headers: {
      'Authorization': 'Bearer ' + spotify,
      'Content-Type': 'application/json',
      'market': 'FR',
    },
    json: true
  };

  var id = '0cFS3AMF9Lhj3CNoFvwjvY'
  const requestor = new RequestHandler()

  const getCurrentTrack = async () => {
    try {
      // const opt: FetchRequest = { headers: Record }
      // requestor.spotifyFetch(`tracks${id}`,)
      theService.getMusicById(id)

      // var GetTrackOptions = {
      //     method: 'GET',
      //     url: 'https://api.spotify.com/v1/tracks/'+id,

      //     headers: {
      //       'Authorization': 'Bearer ' + spotify,
      //       'Content-Type' : 'application/json',
      //       'market' : 'FR',
      //     },
      //     json: true
      //   };
      // const resp = await axios(GetTrackOptions)
      // console.log("============");
      // console.log(resp.data.href);
      // console.log("================================"+resp.data.album.images[0].url+ "================================");
      // var tmp = currentspot;

      // tmp.sourceUrl = resp.data.album.images[0].url;
      // setCurrentspot(tmp);
      // await axios(authOptions).then(async (response) =>{
      //     console.log(response.data.item.preview_url);
      //     const id =  response.data.item.id;
      //     var GetTrackOptions = {
      //         method: 'GET',
      //         url: 'https://api.spotify.com/v1/tracks/'+id,

      //         headers: {
      //           'Authorization': 'Bearer ' + spotify,
      //           'Content-Type' : 'application/json',
      //           'market' : 'FR',
      //         },
      //         json: true
      //       };
      //       console.log("============");
      //       const music  = await axios(GetTrackOptions);
      //       console.log("================================"+music.data+ "================================");
      //       currentspot.sourceUrl = music.data.images[0];
      //       setCurrentspot(currentspot);
      // })

      // const response = await fetch('https://api.spotify.com/v1/me', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer ' + spotify,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // response.json()

      // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)

    } catch (err) {
      console.error(err);
    }
  }
  const animationState = new Value(State.UNDETERMINED);


  return (
    <SafeAreaView style={styles.mainSafeArea}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {/* <SharedElement  id={spot.name} style={{ flex: 1 }}>                 */}
        <View style={{ borderWidth: 1, borderColor: 'red' }}>

          <Animated.Image
            source={{
              uri: currentspot.sourceUrl,
            }}
            style={[
              {

                width: 370,
                height: 370,
                borderRadius: 24,
                resizeMode: 'stretch',
              }, styleAniamatedImage

            ]}
          />
          <Button title="Current Track"
            onPress={() => {
              getCurrentTrack()
              // promptAsync();
            }}
          />
        </View>
        {/* Button */}



        {/* <TapGestureHandler {...gestureHandler}> */}
        <Animated.View>
          <TouchableOpacity style={{
            backgroundColor: '#1DB954',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 24,
          }} onPressIn={handlePlaySound}
            onPressOut={handleStopSound}
            onLongPress={handlePlaySound}
            delayLongPress={1000}>

            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
              {isPlaying ? 'Playing...' : 'Play'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* </TapGestureHandler> */}

        {/* Button */}


        {/* <View style={detailRadicalStyle.container}>
            <Text style={detailRadicalStyle.radicalText}>{props.character}</Text>
            <SvgXml
                xml={props.icon
                    .replace(/fill="#[0-9a-f]{6}"/g, `fill=${detailRadicalStyle.svg.color}`)}
                width="30"
                height="30"
                opacity={0.5}
                style={detailRadicalStyle.radicalIcon}

            />
        </View> */}
        {/* </SharedElement> */}
      </View>
    </SafeAreaView>

  );
};

export default SpotDetailsPage;

const styles = StyleSheet.create({
  mainSafeArea: {
    flex: 1,
    backgroundColor: "#141414",
  }
})