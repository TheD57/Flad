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
            <Image source={source} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        alignItems: "flex-start",
        width: normalize(152),
        height: normalize(152),
        borderRadius: 90,
        backgroundColor: "white",
        marginHorizontal: normalize(15),
    },
    image: {
        width: normalize(200),
        height: normalize(200),
    }
})