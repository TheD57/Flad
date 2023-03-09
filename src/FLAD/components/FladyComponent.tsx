import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import normalize from './Normalize';

type Flady = {
    image: string | object;
};

export default function FladyComponent(monFlady: Flady) {
    const source = typeof monFlady.image === 'string' ? { uri: monFlady.image } : monFlady.image;
    return (
        <View style={styles.container}>
            <Image source={source} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: normalize(152),
        height: normalize(152),
        borderRadius: 90,
        marginHorizontal: normalize(15),
        overflow: 'hidden',
    },
    image: {
        width: normalize(220),
        height: normalize(220),
        marginLeft: -1
    }
})