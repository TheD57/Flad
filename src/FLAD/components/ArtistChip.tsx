import { useCallback, useState } from 'react';
import { View, StyleSheet ,Text,Image, Pressable, Linking, Alert} from 'react-native'

interface ArtistChipProps {
    backgroundColor : string;
    artist : Artist;
}
  
const ArtistChip = ({artist} : ArtistChipProps) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(artist.url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
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
  
const styles = StyleSheet.create({
  input : {
    justifyContent : 'center',
    alignItems : 'center',
    placeholder : "placeholde"
  },
})

export default HalfCirlce;