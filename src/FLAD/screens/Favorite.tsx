import React, { useEffect, useState} from 'react';
import { Image,StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import CardMusic from '../components/CardMusic';
import normalize from '../components/Normalize';
import Music from '../Model/Music'
import {useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesMusic } from '../redux/actions/appActions';
import { SharedElement } from 'react-navigation-shared-element';

export default function favoritePage() {
    const navigation = useNavigation();
    //@ts-ignore
    const favoritesMusic = useSelector(state => state.appReducer.favoriteMusic);
    const dispatch = useDispatch();
    
   const navigueToDetail = (music : any) => {
    navigation.navigate("MusicDetail", {"music": music})
    };
      // to do
   const [filteredDataSource, setFilteredDataSource] = useState<Music[]>([]);
   const [search, setSearch] = useState('');
      const searchMusic = (text: string) => {
        if (text) {
            const newData = favoritesMusic.filter(function (item: Music) {
                const search = item.title
                    ? item.title.toUpperCase() : ''.toUpperCase();
                const textsearch = text.toUpperCase();
                return search.indexOf(textsearch) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource([]);
            setSearch(text);
        }
    };

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.mainSafeArea}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList style={{marginBottom: 80}}
                        data={favoritesMusic}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => {navigueToDetail(item)}}>
                                <SharedElement id={item.id}>

                                <CardMusic image={item.image} title={item.title} description={item.bio} id={item.id}/>
                                </SharedElement>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item: Music) => item.title }
                    />
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
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainSafeArea: {
        flex: 1,
        backgroundColor: "#141414",
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#141414",
    },
    titleContainer: {
        marginTop: 30,
        marginLeft: 20,
    },
    title: {
        fontSize: normalize(28),
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        marginTop: 10,
        fontSize: normalize(20),
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
