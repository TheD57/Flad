import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, SafeAreaView } from 'react-native';
import CardMusic from '../components/CardMusic';
import normalize from '../components/Normalize';
import Music from '../Model/Music'
import FladyComponent from '../components/FladyComponent';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';

export default function favoritePage() {
    //Dark Mode
    const isDark = useSelector(state => state.userReducer.dark);
    const style = isDark ? GraphicalCharterDark : GraphicalCharterLight;

    const navigation = useNavigation();
    //@ts-ignore
    const favoritesMusic = useSelector(state => state.appReducer.favoriteMusic);
    const images = [
        { id: 1, source: require('../assets/images/FLADYLove.png') },
        { id: 2, source: require('../assets/images/FLADYStar.png') },
        { id: 3, source: require('../assets/images/FLADYHate.png') },
        { id: 4, source: require('../assets/images/FLADYCry.png') },
    ];
    const navigueToDetail = (music: any) => {
        navigation.navigate("MusicDetail", { "music": music })
    };
    const styles = StyleSheet.create({
        mainSafeArea: {
            flex: 1,
            backgroundColor: style.body,
        },
        titleContainer: {
            marginTop: 30,
            marginLeft: 20,
        },
        title: {
            fontSize: normalize(28),
            fontWeight: 'bold',
            color: style.Text,
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

    return (
        <SafeAreaView style={styles.mainSafeArea}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView>
                <View>
                    <FlatList style={{ marginBottom: 30 }}
                        data={favoritesMusic}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => { navigueToDetail(item) }}>
                                <SharedElement id={item.id}>

                                    <CardMusic image={item.image} title={item.title} description={item.bio} id={item.id} />
                                </SharedElement>
                            </TouchableHighlight>
                        )}
                        keyExtractor={(item: Music) => item.title}
                    />
                </View>
                <Text style={[styles.title, { marginLeft: 20 }]}>What's your mood?</Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={images}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <FladyComponent image={item.source} />
                    )}
                />
                <TouchableOpacity style={[styles.button, styles.shadow]}
                    // @ts-ignore
                    onPress={() => navigation.navigate('Genre')}>
                    <Image source={require("../assets/icons/icons/next.png")} style={styles.buttonImage} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};