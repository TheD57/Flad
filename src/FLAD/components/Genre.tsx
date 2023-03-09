import { useState } from "react";
import { FlatList, ScrollView } from "react-native";
import Music from "../Model/Music";
import { Artist } from "./Artist";
import { StyleSheet } from "react-native";

export const ArtistLayout = () => {
  const MUSIC_LIST: Music[] = [
    new Music("La pharmacie", "Jul", require("../assets/images/jul.png")),
    new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
    new Music("Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
    new Music("Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png"),
    new Music("Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg"),
    new Music("Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png"),
    new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
    new Music("Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
  ]
  const [artists, setArtists] = useState<Music[]>(MUSIC_LIST);
  const [selectedArtists, setSelectedArtists] = useState<typeof MUSIC_LIST>([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {artists.map((artist, i) => (
        <Artist
          artist={artist}
          key={artist.title}
          onPress={() => {
            // artists.splice(i, 1);
            // // 2 implementation
            const tmppArtist = new Music("Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png");

            // const existingObjIndex = selectedArtists.findIndex(obj => obj.title === tmppArtist.title);
            // if (existingObjIndex === -1) {
            //     selectedArtists.push(tmppArtist);
            // } else {
            //     selectedArtists.splice(existingObjIndex, 1);
            // }
            // setSelectedArtists([...selectedArtists]);
            // 1 implementation
            // setSelectedArtists(selectedArtists.findIndex(obj => obj.title === tmppArtist.title) === -1
            // ? [...selectedArtists, tmppArtist]   
            // : selectedArtists.filter(obj => obj.title !== tmppArtist.title))
            // 3 implementations
            // use the selectedProps of the Artist Component
            // then when we need to finish 
            //  onPress{ () => setSelectedArtists([...selectedArtists,artists.filter(artist => artist.selected)])}

            artists.push(tmppArtist);
            setArtists([...artists]);
          }}
        />
      ))}
      {/* <FlatList
            data={artists}
            // need to reverse colums oreder
            numColumns = {3}
            renderItem={({ item }) => (
                <Artist
            artist={item}
            key={item.title}
            onPress={() => {
                artists.push(new Music("Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"));
                setArtists([...artists]);
            }}/>
            )}
            keyExtractor={(item: Music) => item.title }
            // ListEmptyComponent = {}
            /> */}

    </ScrollView>

  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});