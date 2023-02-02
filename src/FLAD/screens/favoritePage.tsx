import React, {Component} from 'react';
import { Animated, StyleSheet, Text, View, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import Card from '../components/Card';
import CardMusic from '../components/CardMusic';
import Music from '../model/Music'

export default function favoritePage() {
    const MUSIC_LIST : Music[] = [
        new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
        new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
        new Music("Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png"),
        new Music("Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg"),
        new Music("Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png"),
        new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
      ]
    return (
        <View style={styles.body}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View>
                    <FlatList
                        data={MUSIC_LIST}
                        renderItem={({ item }) => (
                            //<TouchableHighlight onPress={() => navigation.navigate("")}>
                                <CardMusic image={item.image} title={item.title} description={item.bio}/>
                            //</TouchableHighlight>
                        )}
                        keyExtractor={(item: Music) => item.title }
                      />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#141414"
    },
    titleContainer: {
        marginLeft: 20,
        marginVertical: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        marginTop: 10,
        fontSize: 18,
        color: '#787878',
    },
    scroll: {
        marginBottom: 120,
    }
});
