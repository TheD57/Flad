import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, useColorScheme } from 'react-native';
import normalize from '../components/Normalize';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';

// @ts-ignore
export default function Onboarding({ item }) {
    const style = useColorScheme() == 'light' ? GraphicalCharterLight : GraphicalCharterDark;
    const { width, height } = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: normalize(60),
            backgroundColor: style.body
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
            color: style.Text,
            textAlign: 'left',
            paddingRight: 30,
            paddingLeft: 20,
            marginTop: normalize(30)
        },
        description: {
            fontWeight: '300',
            color: style.Text,
            fontSize: normalize(16),
            textAlign: 'left',
            paddingRight: 30,
            paddingLeft: 20
        }
    })
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

