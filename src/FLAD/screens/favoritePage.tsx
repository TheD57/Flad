import React, {Component} from 'react';
import { Animated, Image,StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import CardMusic from '../components/CardMusic';
import normalize from '../components/Normalize';
import Music from '../Model/Music'
import {useNavigation} from "@react-navigation/native";

export default function favoritePage() {
    const navigation = useNavigation();

    const MUSIC_LIST : Music[] = [
        new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
        new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
        new Music("Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
        new Music("Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png"),
        new Music("Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg"),
        new Music("Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png"),
        new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
        new Music("Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
      ]
    return (
        <View style={styles.body}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList style={{marginBottom: 80}}
                        data={MUSIC_LIST}
                        renderItem={({ item }) => (
                            //<TouchableHighlight onPress={() => navigation.navigate("")}>
                                <CardMusic image={item.image} title={item.title} description={item.bio}/>
                            //</TouchableHighlight>
                        )}
                        keyExtractor={(item: Music) => item.title }
                      />
                </View>
                <TouchableOpacity style={[styles.button, styles.shadow]} 
                    // @ts-ignore
                    onPress={() => navigation.navigate('Genre')}>
                        <Image source={require("../assets/icons/icons/next.png")} style={styles.buttonImage}/>
                    </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#141414",
    },
    titleContainer: {
        marginTop: 20,
        marginLeft: 20,
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
        marginBottom: 20
    },
    button: {
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: normalize(100),
        height: normalize(100),
        borderRadius: 21
    },
    buttonImage: {
        width: normalize(46),
        height: normalize(46),
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
    }
});
