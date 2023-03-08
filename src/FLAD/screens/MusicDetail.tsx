import { NavigationProp, RouteProp } from "@react-navigation/native";
import { View,Text,Image,StyleSheet, Dimensions, useWindowDimensions, Button, TouchableOpacity } from "react-native";
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, useDerivedValue, useSharedValue, Value, withSpring, withTiming } from "react-native-reanimated";
import { BlurView } from 'expo-blur';
import qs from "qs";
import axios from "axios";
import { Buffer } from 'buffer';
import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import normalize from '../components/Normalize';
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { RequestHandler } from "../services/spotify/spotifyRequestHandler/utils";
import { FetchRequest } from "expo-auth-session/build/Fetch";
import Music from "../Model/Music";
import SpotifyService from "../services/spotify/spotify.service";
import { SharedElement } from "react-navigation-shared-element";
import { SafeAreaView } from "react-native-safe-area-context";

const halfPi = Math.PI/2;

//@ts-ignore
const MusicDetail = ({ route }) => {    
    const music : Music = route.params.music;
    const [currentspot, setCurrentspot] = useState(music);
    const [sound, setSound] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const loader = useSharedValue(0);
    useEffect(() => {
        loader.value = isPlaying ? 1 : 0
    }, [isPlaying,loader ]);

    const transition = useDerivedValue(()=>{
        return withTiming(loader.value, {duration : 1000})
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


    const playTrackPreview = async () => {
    console.log("===============================================================================================================");

        console.log('get in  Sound');

        const { sound } = await Audio.Sound.createAsync({uri :music.trackPreviewUrl});
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
        { uri: music.trackPreviewUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      
    } else {
        setIsPlaying(true);
        //@ts-ignore
      await sound.playAsync();
    }
  };

  const handleStopSound = async () => {
    if (sound !== null) {
        setIsPlaying(false);

        //@ts-ignore
      await sound.stopAsync();
    }
    else{
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
      
    const sensor = useAnimatedSensor(SensorType.ROTATION);
    const styleAniamatedImage = useAnimatedStyle(() => {
        const {yaw, pitch, roll} = sensor.sensor.value;
        const verticalAxis =interpolate(
            pitch,
            [-halfPi*2,halfPi*2],
            [-45, 45]
        )
        const horizontalAxis =interpolate(
            roll,
            [-halfPi*2,halfPi*2],
            [-45, 45]
        )
        return {
            top : withSpring( verticalAxis),
            left : withSpring(horizontalAxis),
        };
        
    })
    // const CLIENT_ID = "1f1e34e4b6ba48b388469dba80202b10";
    // const CLIENT_SECRET = "779371c6d4994a68b8dd6e84b0873c82";
    // const spotify = "BQA2IAFZ-7ta4-_4_Uqdcdrqi_peE6Hlf1jwxFqjXTbwes0z8xgVGx0rE3zv4cQlusd1ILJhRwkxzPsL1YakzSvCxaTI1P7kOzBrrMqlkDgk4vlFvzLjScB0hBLULbpZyn3ylgx4RyZBEWfmc24wZPQOsrJU58AYCveA52UxYVSIc_Frr7LZyRmwjzGB68MPZeBD"
    // var authOptions = {
    //     method: 'GET',
    //     url: 'https://api.spotify.com/v1/me/player/currently-playing',
       
    //     headers: {
    //       'Authorization': 'Bearer ' + spotify,
    //       'Content-Type' : 'application/json',
    //       'market' : 'FR',
    //     },
    //     json: true
    //   };
      
    // var id = '0cFS3AMF9Lhj3CNoFvwjvY'
    // const requestor = new RequestHandler()

    // const getCurrentTrack = async () => {
    //     try {
    //       const opt : FetchRequest ={headers : Record}
    //         requestor.spotifyFetch(`tracks${id}`,)

    //         // var GetTrackOptions = {
    //         //     method: 'GET',
    //         //     url: 'https://api.spotify.com/v1/tracks/'+id,
               
    //         //     headers: {
    //         //       'Authorization': 'Bearer ' + spotify,
    //         //       'Content-Type' : 'application/json',
    //         //       'market' : 'FR',
    //         //     },
    //         //     json: true
    //         //   };
    //         // const resp = await axios(GetTrackOptions)
    //         // console.log("============");
    //         // console.log(resp.data.href);
    //         // console.log("================================"+resp.data.album.images[0].url+ "================================");
    //         // var tmp = currentspot;
        
    //         // tmp.sourceUrl = resp.data.album.images[0].url;
    //         // setCurrentspot(tmp);
    //         // await axios(authOptions).then(async (response) =>{
    //         //     console.log(response.data.item.preview_url);
    //         //     const id =  response.data.item.id;
    //         //     var GetTrackOptions = {
    //         //         method: 'GET',
    //         //         url: 'https://api.spotify.com/v1/tracks/'+id,
                   
    //         //         headers: {
    //         //           'Authorization': 'Bearer ' + spotify,
    //         //           'Content-Type' : 'application/json',
    //         //           'market' : 'FR',
    //         //         },
    //         //         json: true
    //         //       };
    //         //       console.log("============");
    //         //       const music  = await axios(GetTrackOptions);
    //         //       console.log("================================"+music.data+ "================================");
    //         //       currentspot.sourceUrl = music.data.images[0];
    //         //       setCurrentspot(currentspot);
    //         // })

    //         // const response = await fetch('https://api.spotify.com/v1/me', {
    //         //   method: 'GET',
    //         //   headers: {
    //         //     Authorization: 'Bearer ' + spotify,
    //         //     'Content-Type': 'application/json',
    //         //   },
    //         // });
    //         // response.json()
            
    //       // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
      const animationState = new Value(State.UNDETERMINED);
      const playMusic = async (id: string) => {
         try { 
              const service = new SpotifyService("BQDWJTPvSloZPYDqLc1YWri2LEcognvqoM5bdoCWMuHR9In2FhaKq5tW3-VC5JET9dD9K-W4Rmm0IiyhtX-fSL3Tb8RTHMJUc5GKFq2jxWlH7QXxsiYZV8Fhw2qU1eCpSof1qkPsBd1R36GOgcBaXq2N6kLTP5UcfP-gzjz65x_fVRSxoP6znK2dkvL6saQ6WwzoEFopqpqo") ;
              console.log("=====================================================)))))))))))))))"+id+"================================")
              await service.playMusic(id);
            }catch(error){}
        }
    
    return (
    <SafeAreaView style={styles.mainSafeArea}>
        
    <View style={{ flex: 1, justifyContent : 'flex-start', alignItems : 'center' }}>
        {/* <SharedElement  id={spot.name} style={{ flex: 1 }}>                 */}
        <View>

            <Animated.Image
                    source={{
                        uri:currentspot.image ,
                    }}
                    style={[
                        {
                            
                        width: normalize(429),
                        height: normalize(429),
                        borderRadius : 24,
                        resizeMode: 'stretch',
                        },styleAniamatedImage
                        
                    ]}
                    />
                    <Button title="Play Track On Device"
                    onPress={() => {
                        playMusic(currentspot.id)
                        // promptAsync();
                    }}/>

                    </View>
                    {/* Button */}



                    {/* <TapGestureHandler {...gestureHandler}> */}
                        <Animated.View>
                            <TouchableOpacity style={{
                                backgroundColor: '#1DB954',
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                                borderRadius: 24,
                            }}  
                            onPressOut={handleStopSound}
                            onLongPress={handlePlaySound}
                            delayLongPress={500}>

                                <Text style={ {
                                    color: '#fff',
                                    fontSize: normalize(18),
                                    fontWeight: 'bold',}}>
                                        {isPlaying ? 'Playing...' : 'Play'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                        
                    {/* </TapGestureHandler> */}
                   
                {/* Button */}
        {/* </SharedElement> */}
        </View>
    </SafeAreaView>

    );
};

export default MusicDetail;

const styles = StyleSheet.create ({
    mainSafeArea: {
        flex: 1,
        backgroundColor: "#141414",
    }
})