
import * as React from 'react';
import { TouchableOpacity, ScrollView, View, Text, StyleSheet, Image, SafeAreaView, FlatList, Animated } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { Dimensions, useWindowDimensions, Button } from "react-native";
import { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, useDerivedValue, useSharedValue, Value, withSpring, withTiming } from "react-native-reanimated";
import { BlurView } from 'expo-blur';
import qs from "qs";
import axios from "axios";
import { Buffer } from 'buffer';
import { Audio } from 'expo-av';
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { RequestHandler } from "../services/spotify/spotifyRequestHandler/utils";
import { FetchRequest } from "expo-auth-session/build/Fetch";
import SpotifyService from "../services/spotify/spotify.service";
import Music from '../Model/Music';
import { HorizontalFlatList } from '../components/HorizontalFlatList';
import { LittleCard } from '../components/littleCard';
const halfPi = Math.PI / 2;
// InfoScreen.sharedElement = (navigation : ReturnType<typeof useNavigation>)=>{
//     const music = navigation.getParam('music');
//     return [music.id];
// }
// @ts-ignore
export default function InfoScreen({ route, navigation }) {

    const item: Music = route.params.music;

    const insets = useSafeAreaInsets();

    const [similarMusics, setSimilarMusics] = useState<Music[]>([]);

    // parralax

    // parralax


    const styles = StyleSheet.create({
        background1: {
            height: '100%',
            width: '100%',
            paddingTop: insets.top,
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
            height: "45%",
            width: '100%',
            position: "absolute",
        },
        gradientFade: {
            height: "30%",
            top: "25%"
        },
        backButton: {
            position: "absolute",
            top: 10,
            left: 5
        },
        list: {
            height: "100%"
        },
        section1: {
            paddingHorizontal: 35
        },
        title: {
            color: "white",
            fontSize: 43,
            fontWeight: "bold",
            paddingBottom: 10,
            paddingTop: "45%"
        },
        characteristics: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start"
        },
        stars: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: 30
        },
        starsLabel: {
            color: "#FFC42D",
            fontWeight: "bold",
            paddingLeft: 10,
            fontSize: 16
        },
        player: {
            borderRadius: 10,
            overflow: "hidden"
        },
        resume: {
            color: "#B3B3B3",
            paddingTop: 30,
            fontSize: 17
        },
        creditSection: {
            paddingTop: 30
        },
        creditTitle: {
            color: "#2998FD",
            paddingBottom: 20,
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600"
        },
        similarSection: {
            paddingTop: 30
        },
        similarTitle: {
            color: "#2998FD",
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600",
            paddingBottom: 20
        },
        similarContainer: {
            width: 90,
            marginHorizontal: 7
        },
        similarPoster: {
            height: 130,
            width: 90,
            borderRadius: 8
        },
        similarTitleFilm: {
            color: "#DADADA",
            paddingTop: 5,
            fontWeight: "300"
        },
        reviewSection: {
            paddingTop: 30
        },
        reviewTitle: {
            color: "#2998FD",
            paddingLeft: 35,
            fontSize: 17,
            fontWeight: "600",
            paddingBottom: 10
        },
        reviewContainer: {
            marginHorizontal: 7,
            width: 300,
            padding: 20,
            backgroundColor: "#09090F",
            marginVertical: 10,
            borderRadius: 14,
            borderWidth: 0.8,
            borderColor: "rgba(223,223,223,0.14)"
        },
        reviewInfo: {
            flexDirection: "row",
            paddingBottom: 20
        },
        imageProfile: {
            height: 50,
            width: 50,
            borderRadius: 100
        },
        infoContainer: {
            paddingLeft: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            alignItems: "center"
        },
        pseudo: {
            color: "white",
            paddingTop: 5,
            fontWeight: "700",
            fontSize: 16
        },
        date: {
            color: "grey",
            paddingTop: 5,
            fontWeight: "500",
            fontSize: 14
        },
        message: {
            color: "#B3B3B3",
            paddingTop: 5,
            fontWeight: "400"
        },
        creditContainer: {
            width: 90,
            marginHorizontal: 7,
            alignItems: "center"
        },
        bubble: {
            justifyContent: "center"
        },
        photo: {
            height: 90,
            width: 90,
            borderRadius: 200,
            borderWidth: 3,
            borderColor: "rgba(255,255,255,0.8)"
        },
        popularityDot: {
            backgroundColor: "white",
            borderRadius: 20,
            padding: 2,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            right: 0,
            flexDirection: "row"
        },
        popularityLabel: {
            color: "black",
            fontWeight: "500",
            paddingRight: 4
        },
        creditName: {
            color: "#DADADA",
            paddingTop: 5,
            fontWeight: "300"
        }
    });


    const getSimilarMusics = async () => {


        const tmpMusic: Music[] = [
            // new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
            // new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
            new Music("6npyDB4mn8MO1A1h666FTk", "Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png", "https://p.scdn.co/mp3-preview/d38052978a79adced2187cd8b6497bb10bedc452?cid=774b29d4f13844c495f206cafdad9c86"),
            // new Music("0qwxx9ouUc5kGmMWHglDpq","Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png",""),
            new Music("03o8WSqd2K5rkGvn9IsLy2", "Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg", "https://p.scdn.co/mp3-preview/c55f95de81b8c3d0df04148da1b03bd38db56e8f?cid=774b29d4f13844c495f206cafdad9c86"),
            new Music("6DPrYPPGYK218iVIZDix3i", "Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png", "https://p.scdn.co/mp3-preview/a9f9cb19ac1fe6db0d06b67decf8edbb25895a33?cid=774b29d4f13844c495f206cafdad9c86"),
            // new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
            new Music("5GFHFEASZeJF0gyWuDDjGE", "Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png", "https://p.scdn.co/mp3-preview/9e854f4905c1228482e390169eb76d8520076b8f?cid=774b29d4f13844c495f206cafdad9c86"),
        ];
        setSimilarMusics(tmpMusic);
    }


    useEffect(() => {
        getSimilarMusics();
    }, []);

    ////////////////////////////////////////////////



    const { width, height } = useWindowDimensions();

    const [currentspot, setCurrentspot] = useState(item);
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

        const { sound } = await Audio.Sound.createAsync({ uri: item.trackPreviewUrl });
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
                { uri: item.trackPreviewUrl },
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


    const sensor = useAnimatedSensor(SensorType.ROTATION);
    const styleAniamatedImage = useAnimatedStyle(() => {
        const { yaw, pitch, roll } = sensor.sensor.value;
        const verticalAxis = interpolate(
            pitch,
            [-halfPi * 2, halfPi * 2],
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

    const animationState = new Value(State.UNDETERMINED);
    const playMusic = async (id: string) => {
        try {
            const service = new SpotifyService("BQC4k_OPQXENwmm2S8qLm9whlJT9IjeKsuG6kJNyVCSd88b0L-zOY84VqwvQxFsc9G3GvtPyUMezwxi8BBBloitzbhWX5tmTKTaLsJosGTnb7xivwNhRv0-LnNYbZWB24ZGAg0xPmDLn0yYmYlo7M_SMK5cCZdYQcZNXAuMYaI18GVXKoICBaKfCn4GcqBiRRgXyCVQnNGU4");
            console.log("=====================================================)))))))))))))))" + id + "================================")
            await service.playMusic(id);
        } catch (error) { }
    }
    const tmpMusic2: Music[] = [
        // new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
        // new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
        new Music("6npyDB4mn8MO1A1h666FTk", "Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png", "https://p.scdn.co/mp3-preview/d38052978a79adced2187cd8b6497bb10bedc452?cid=774b29d4f13844c495f206cafdad9c86"),
        // new Music("0qwxx9ouUc5kGmMWHglDpq","Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png",""),
        new Music("03o8WSqd2K5rkGvn9IsLy2", "Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg", "https://p.scdn.co/mp3-preview/c55f95de81b8c3d0df04148da1b03bd38db56e8f?cid=774b29d4f13844c495f206cafdad9c86"),
        new Music("6DPrYPPGYK218iVIZDix3i", "Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png", "https://p.scdn.co/mp3-preview/a9f9cb19ac1fe6db0d06b67decf8edbb25895a33?cid=774b29d4f13844c495f206cafdad9c86"),
        // new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
        new Music("5GFHFEASZeJF0gyWuDDjGE", "Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png", "https://p.scdn.co/mp3-preview/9e854f4905c1228482e390169eb76d8520076b8f?cid=774b29d4f13844c495f206cafdad9c86"),
    ];
    return (
        <View style={styles.body}>
            <View style={styles.backgroundSection}>
                <Image
                    style={styles.back_drop}
                    source={{
                        uri: item.image,
                    }}
                ></Image>

                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                />
                <LinearGradient style={styles.gradientFade}
                    // Button Linear Gradient
                    colors={['rgba(14,14,14,0)', 'rgba(14,14,14,0.7)', 'rgba(14,14,14,1)', 'rgba(14,14,14,1)']}>
                </LinearGradient>
            </View>
            <View style={styles.background1}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 100 }}>
                    <Ionicons name="ios-arrow-back" size={30} color="white" style={styles.backButton} />
                </TouchableOpacity>

                <ScrollView style={styles.list} showsVerticalScrollIndicator={false} scrollEventThrottle={4}
                >
                    <View style={styles.section1}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            {/* <SharedElement  id={spot.name} style={{ flex: 1 }}>                 */}
                            <View>
                                <SharedElement id={item.id}>

                                    <Animated.Image
                                        source={{
                                            uri: currentspot.image,
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
                                </SharedElement>
                                <Button title="Play Track On Device"
                                    onPress={() => {
                                        playMusic(currentspot.id)
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


                        </View>

                    </View>

                    {similarMusics.length !== 0 && (
                        // <HorizontalFlatList renderCell={littleCard} title={'Simillar Music'} data={similarMusics}>

                        // </HorizontalFlatList>

                        <HorizontalFlatList title={'Simillar Music'} data={tmpMusic2}>
                            {(props) => (
                                <LittleCard image={props.image} title={props.title} />
                            )}
                        </HorizontalFlatList>
                    )}



                </ScrollView>
            </View>
        </View>
    )
}
