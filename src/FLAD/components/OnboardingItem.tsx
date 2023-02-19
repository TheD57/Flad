import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';

import slides from '../data/slides';

export default function Onboarding({ item }) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain'}]} />

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: -60
    },
    image: {
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: 'white',
        textAlign: 'left',
        paddingRight: 30,
        paddingLeft: 20,
        marginTop: -80
    },
    description: {
        fontWeight: '300',
        color: 'white',
        textAlign: 'left',
        paddingRight: 30,
        paddingLeft: 20
    }
})
