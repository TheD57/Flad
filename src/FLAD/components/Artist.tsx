import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Animated, {
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width / 3;
import { Feather as Icon } from "@expo/vector-icons";
import Music from "../Model/Music";
import { State } from "react-native-gesture-handler";
import { useState } from "react";


interface ArtistProps {
  artist: Music;
  onPress: () => void;
}
export const Artist = ({ artist, onPress }: ArtistProps) => {
  const source = typeof artist.image === 'string' ? { uri: artist.image } : artist.image;
  const [selected, setSeleted] = useState(false);
  const onS = () => {
    setSeleted(!selected);
    onPress();
  };
  return (
    <TouchableOpacity onPress={onS}>
      <Animated.View
        style={styles.container}
        entering={ZoomIn}
        exiting={ZoomOut}
        layout={Layout.delay(200)}
      >
        <View style={styles.card}>
          <Image source={source} style={styles.image} />
          {selected && (
            <View style={styles.cheked}>
              <Icon name="check-circle" color="black" size={24} />
            </View>
          )

          }

        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    padding: 8,
  },
  card: {
    flex: 1,
    padding: 8,
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  cheked: {
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",


  }
});