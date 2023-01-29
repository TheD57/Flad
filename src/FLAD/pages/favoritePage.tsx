import React, {Component} from 'react';
import { Animated, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Card from '../components/Card';
import CardMusic from '../components/CardMusic';


export default function favoritePage() {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Favoris</Text>
                <Text style={styles.description}>Retrouvez ici vos musiques favorites</Text>
            </View>
            <ScrollView>
                <CardMusic image="../assets/jul.png" title="La pharmacie" description="Jul"/>
                <CardMusic image="../assets/pnl.png" title="deux frères" description="PNL"/> 
                <CardMusic image="../assets/jul.png" title="La pharmacie" description="Jul"/>
                <CardMusic image="../assets/pnl.png" title="deux frères" description="PNL"/> 
                <CardMusic image="../assets/jul.png" title="La pharmacie" description="Jul"/>
                <CardMusic image="../assets/pnl.png" title="deux frères" description="PNL"/> 
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
