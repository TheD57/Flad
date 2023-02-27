import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import normalize from '../components/Normalize';

// @ts-ignore
export default function Onboarding({ item }) {
    const { width, height } = useWindowDimensions();

    return (
        <View style={[styles.container, { width, height }]}>
            <View style={{ overflow: 'hidden', height: height * 0.5 }}>
                <Image source={item.image} style={[styles.image]} resizeMode="stretch" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: normalize(60),
        backgroundColor: '#141414'
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: normalize(32),
        marginBottom: 10,
        color: 'white',
        textAlign: 'left',
        paddingRight: 30,
        paddingLeft: 20,
        marginTop: normalize(30)
    },
    description: {
        fontWeight: '300',
        color: 'white',
        fontSize: normalize(16),
        textAlign: 'left',
        paddingRight: 30,
        paddingLeft: 20
    }
})
