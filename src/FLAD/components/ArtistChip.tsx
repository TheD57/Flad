import { useCallback } from 'react';
import { View, Text, Image, Pressable, Linking, Alert } from 'react-native'
import Artist from '../Model/Artist';

interface ArtistChipProps {
  backgroundColor: string;
  artist: Artist;
}

const ArtistChip = ({ artist }: ArtistChipProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(artist.url);

    if (supported) {
      await Linking.openURL(artist.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${artist.url}`);
    }
  }, [artist.url]);

  return (
    <View>
      <Pressable onPress={handlePress}>
        <View>
          <Image
            source={{
              uri: artist.image,
            }}
          ></Image>
        </View>

        <View>
          <Text>ii</Text>
        </View>
      </Pressable>
    </View>
  );
};


export default ArtistChip;