import React, {Component} from 'react';
import { Animated, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Card from '../components/Card';
import CardMusic from '../components/CardMusic';


export default function favoritePage() {
    export const MUSIC_LIST : Music[] = [
        new Music("La pharmacie", "Jul",require("../assets/Images/jul.png")),
        new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
        new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
      ]
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList
                        data={MUSIC_LIST}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => navigation.navigate("")}>
                                <CardMusic image="{item.image}" title="{item.title}" description="{item.bio}"/>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item: Music) => item.title }
                      />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
});
