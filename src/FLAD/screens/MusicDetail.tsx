import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { View,Text,Image,StyleSheet, Dimensions, useWindowDimensions, Button, TouchableOpacity, ScrollView, Pressable } from "react-native";
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
import Music from "../Model/Music";
import SpotifyService from "../services/spotify/spotify.service";
import { SharedElement } from "react-navigation-shared-element";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "../assets/icons/icons/icon";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather as Icon } from "@expo/vector-icons";
import { HorizontalFlatList } from "../components/HorizontalFlatList";
import { LittleCard } from "../components/littleCard";
import normalize from "../components/Normalize";
import { Circle } from "react-native-svg";
import { AntDesign } from '@expo/vector-icons';

const halfPi = Math.PI/2;

//@ts-ignore
const MusicDetail = ({ route }) => {    
    const music : Music = route.params.music;
    const [currentspot, setCurrentspot] = useState(music);
    const [sound, setSound] = useState(null);
    const [simularMusic, setSimularMusic] = useState([] as Music []);
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

        const tmpMusic2: Music[] = [
            // new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
            // new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
            new Music("6npyDB4mn8MO1A1h666FTk","Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png","https://p.scdn.co/mp3-preview/d38052978a79adced2187cd8b6497bb10bedc452?cid=774b29d4f13844c495f206cafdad9c86"),
            // new Music("0qwxx9ouUc5kGmMWHglDpq","Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png",""),
            new Music("03o8WSqd2K5rkGvn9IsLy2","Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg","https://p.scdn.co/mp3-preview/c55f95de81b8c3d0df04148da1b03bd38db56e8f?cid=774b29d4f13844c495f206cafdad9c86"),
            new Music("6DPrYPPGYK218iVIZDix3i","Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png","https://p.scdn.co/mp3-preview/a9f9cb19ac1fe6db0d06b67decf8edbb25895a33?cid=774b29d4f13844c495f206cafdad9c86"),
            // new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
            new Music("5GFHFEASZeJF0gyWuDDjGE","Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png","https://p.scdn.co/mp3-preview/9e854f4905c1228482e390169eb76d8520076b8f?cid=774b29d4f13844c495f206cafdad9c86"),
          ] ; 
    const getSimilarTrack = async () => {
        const service =new SpotifyService("BQC0Ne1eU2bR28A65uO-M9QPLCmGveUG5E7tQ5dD8nmzQvcz2OqUWNMYEM7zx0sEIvOPoV3S9XKSlFbFx5C3si97YAXU-4AzRiqoshfmLTFlGoPMkmGhYip9MDzshhbZM76eEWJ6x43YoXiM-TQBhI0HKh78W6a3A34TXIrn0QzU3rvZM2-ftnTfKD2e2bAN3FgDc38C");
        var simularMusic = await service.getSimilarTrack(currentspot.id,5,'FR');
        setSimularMusic(simularMusic);
    }
    useEffect(() => {
        getSimilarTrack();
    }, []);
    const navigator = useNavigation();
          
    return (
    <SafeAreaView style={styles.mainSafeArea}>
        <View style={styles.body}>
        <View style={styles.backgroundSection}>
                <Image
                    blurRadius={133}
                    style={styles.back_drop}
                    source={{
                        uri: currentspot.image,
                    }}
                ></Image>

                {/* <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                /> */}
                <LinearGradient style={styles.gradientFade}
                    // Button Linear Gradient
                                colors={['rgba(56,56,56,0)', 'rgba(14,14,14,1)']}>
                </LinearGradient>
            </View>
            <View style={styles.background1}>
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false} scrollEventThrottle={4}>
                
           
                
                    <View style={styles.section1}>  
    <View style={{ flex: 1,justifyContent : 'flex-start', alignItems : 'center' }}>
        {/* <SharedElement  id={spot.name} style={{ flex: 1 }}>                 */}
        <View>

            <Animated.Image
                    source={{
                        uri:currentspot.image ,
                    }}
                    style={[
                        {
                            
                        // width: 370,
                        // width: 400,
                        width: 392,
                        height: 392,
                        borderRadius : 24,
                        resizeMode: 'stretch',
                        },styleAniamatedImage
                        
                    ]}
                    />
        </View>
        <View style={{marginTop : 45,flex: 1, flexDirection : 'row', }}>
            <View>

            </View>
            <TouchableOpacity activeOpacity={0.5} style={{
                    backgroundColor: '#F80404',
                    borderRadius: 100,
                    padding: normalize(23)
                    
                }}>
               <View style={{flex: 1, justifyContent : 'center', alignContent : 'center'}}>
                    <FontAwesome name="play" size={32} color="#FFFF"  ></FontAwesome>
               </View>  
            </TouchableOpacity>
            </View>
        </View>
        
            </View>

                        <View style ={{flex: 1, flexDirection : 'row', justifyContent :'space-evenly', width : '100%' }}>

                        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection : 'row', justifyContent : 'space-evenly',alignItems: 'center', width: 180,
        height: 64, borderRadius: 8, opacity: 0.86 ,backgroundColor: '#0B0606', }}>
            <FontAwesome name="bookmark" size={24} color="#FFFF"  ></FontAwesome>
            <Text style={{ fontSize: normalize(16), fontWeight:"700", color : '#FFFFFF' }}>Dans ma collection</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection : 'row', justifyContent : 'space-evenly',alignItems: 'center', width: 180,
        height: 64, borderRadius: 8, opacity: 0.86 ,backgroundColor: '#0B0606', }}>
            <Icon name="share" size={24} color="#FFFF"></Icon>
            {/* <FontAwesome name="bookmark" size={24} color="#FF0000"  ></FontAwesome> */}
            <Text style={{ fontSize: normalize(16), fontWeight:"700", color : '#FFFFFF' }}>Partager cette music</Text>
        </TouchableOpacity>
        {/* <Pressable style={{flexDirection : 'row', justifyContent : 'space-between', alignItems: 'center', height: "10%" , borderRadius: 8, opacity: 84 ,backgroundColor: 'rgba(29, 16, 16, 0.84)' }}>
            <FontAwesome name="bookmark" size={16} color="#FF0000"  ></FontAwesome>
            <Text style={{ fontSize: 16, fontWeight:"700",lineHeight:12, color : '#FFFFFF' }}>Dans ma collection 2</Text>
        </Pressable> */}
                        </View>
        <HorizontalFlatList  title={'Similar'} data={tmpMusic2}>
            {(props) => (
            <Pressable onLongPress={() => {    navigator.navigate("MusicDetail", {"music": props})        }} >
                <LittleCard image={props.image} title ={props.title}/>              
            </Pressable>
            )}
        </HorizontalFlatList>
            </ScrollView>
        </View>
        </View>
    </SafeAreaView>

    );
};

export default MusicDetail;

const styles = StyleSheet.create ({
    mainSafeArea: {
        flex: 1,
        backgroundColor: "#141414",
    },
    body: {
        backgroundColor: "#0E0E0E"
    },
    backgroundSection: {
        height: "100%",
        width: "100%",
        position: "absolute"
    },
    back_drop: {
        height: "160%",
        width: '430%',
        position: "absolute",
    },
    gradientFade: {
        height: "100%",
    },
    background1: {
        height: '100%',
        width: '100%',
    },
    list: {
        height: "100%"
    },
    section1: {
        paddingHorizontal: 25
    }
})