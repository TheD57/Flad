import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from "react-native";
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, withSpring } from "react-native-reanimated";

import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import normalize from '../components/Normalize';
import Music from "../Model/Music";
import SpotifyService from "../services/spotify/spotify.service";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather as Icon } from "@expo/vector-icons";
import { HorizontalFlatList } from "../components/HorizontalFlatList";
import { LittleCard } from "../components/littleCard";
import * as SecureStore from 'expo-secure-store';
import { useSelector } from "react-redux";

const halfPi = Math.PI / 2;


//@ts-ignore
const MusicDetail = ({ route }) => {
    const music: Music = route.params.music;
    const [currentspot, setCurrentSpot] = useState(music);
    const [simularMusic, setSimularMusic] = useState<Music[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    const navigator = useNavigation();

    const [testtoken, setTesttoken] = useState('')

    const sheet = async () => {
        SecureStore.getItemAsync('MySecureAuthStateKey').then(result => { setTesttoken(result) });
    }

    useEffect(() => {
        sheet();
        getSimilarTrack();
    }, [testtoken]);

    const getSimilarTrack = async () => {
        try {
            const service = new SpotifyService(testtoken);
            const simularMusic = await service.getSimilarTrack(currentspot.id, 5, 'FR');
            console.log("suggesstd", simularMusic);
            setSimularMusic(simularMusic);
        } catch (error) {
            console.error('Error ================ in getSimilarTrack', error);
        }
    }

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
        else {
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
    return (
        <View style={styles.body}>
            <View style={styles.backgroundSection}>
                <Image
                    blurRadius={133}
                    style={styles.back_drop}
                    source={{
                        uri: currentspot.image,
                    }}
                ></Image>
                <LinearGradient style={styles.gradientFade}
                    colors={['rgba(56,56,56,0)', 'rgba(14,14,14,1)']}>
                </LinearGradient>
            </View>
            <View style={styles.background1}>
                <ScrollView style={styles.list} showsVerticalScrollIndicator={false} scrollEventThrottle={4}>
                    <View style={styles.section1}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View>

                                <Animated.Image
                                    source={{
                                        uri: currentspot.image,
                                    }}
                                    style={[
                                        {
                                            width: normalize(429),
                                            height: normalize(429),
                                            borderRadius: 24,
                                            resizeMode: 'stretch',
                                        }, styleAniamatedImage

                                    ]}
                                />
                            </View>
                            <View style={{ marginTop: 45, flex: 1, flexDirection: 'row', }}>
                                <View>

                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{
                                    backgroundColor: '#F80404',
                                    borderRadius: 100,
                                    padding: normalize(23)

                                }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                                        <FontAwesome name="play" size={32} color="#FFFF"  ></FontAwesome>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>

                        <TouchableOpacity activeOpacity={0.6} style={{
                            flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: 180,
                            height: 64, borderRadius: 8, opacity: 0.86, backgroundColor: '#0B0606',
                        }}>
                            <FontAwesome name="bookmark" size={24} color="#FFFF"  ></FontAwesome>
                            <Text style={{ fontSize: normalize(16), fontWeight: "700", color: '#FFFFFF' }}>Dans ma collection</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={{
                            flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: 180,
                            height: 64, borderRadius: 8, opacity: 0.86, backgroundColor: '#0B0606',
                        }}>
                            <Icon name="share" size={24} color="#FFFF"></Icon>
                            {/* <FontAwesome name="bookmark" size={24} color="#FF0000"  ></FontAwesome> */}
                            <Text style={{ fontSize: normalize(16), fontWeight: "700", color: '#FFFFFF' }}>Partagedr cette music</Text>
                        </TouchableOpacity>
                        {/* <Pressable style={{flexDirection : 'row', justifyContent : 'space-between', alignItems: 'center', height: "10%" , borderRadius: 8, opacity: 84 ,backgroundColor: 'rgba(29, 16, 16, 0.84)' }}>
            <FontAwesome name="bookmark" size={16} color="#FF0000"  ></FontAwesome>
            <Text style={{ fontSize: 16, fontWeight:"700",lineHeight:12, color : '#FFFFFF' }}>Dans ma collection 2</Text>
        </Pressable> */}
                    </View>
                    {simularMusic.length !== 0 && (
                        <HorizontalFlatList title={'Similar'} data={simularMusic}>
                            {(props) => (
                                <Pressable onLongPress={() => { navigator.navigate("MusicDetail", { "music": props }) }} >
                                    <LittleCard image={props.image} title={props.title} />
                                </Pressable>
                            )}
                        </HorizontalFlatList>
                    )}
                </ScrollView>
            </View>
        </View>

    );
};

export default MusicDetail;

const styles = StyleSheet.create({
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