import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView } from "react-native";
import Animated, { interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import { theService } from "../App";

const halfPi = Math.PI / 2;

//@ts-ignore
const SpotDetailsPage = ({ route }) => {
  console.log(route);

  const spot: { name: string, sourceUrl: string, index: number } = route.params.spot;
  const [currentspot] = useState(spot);
  const [sound, setSound] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const loader = useSharedValue(0);
  useEffect(() => {
    loader.value = isPlaying ? 1 : 0
  }, [isPlaying, loader]);


  const trackPreviewUrl = 'https://p.scdn.co/mp3-preview/08ef3b9d6dbd6bab233f5e9ca564091902767f71?cid=774b29d4f13844c495f206cafdad9c86';


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
      //@ts-ignore
      sound.unloadAsync();
    }
      : undefined;
  }, [sound]);

  console.log(spot);
  const sensor = useAnimatedSensor(SensorType.ROTATION);
  const styleAniamatedImage = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;
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
  var id = '0cFS3AMF9Lhj3CNoFvwjvY'

  const getCurrentTrack = async () => {
    try {
      theService.getMusicById(id)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SafeAreaView style={styles.mainSafeArea}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
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
            }}
          />
        </View>
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