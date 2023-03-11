import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';

import normalize from '../components/Normalize';

type CustomCardMusic = { //Props
  image: string;
  title: string;
  description: string;
  id: string;
}


export default function CardMusic(CBP: CustomCardMusic) {
  const isDark = useSelector(state => state.userReducer.dark);
  const style = isDark ? GraphicalCharterDark : GraphicalCharterLight;
  const currentMusic = useSelector(state => state.appReducer.currentMusic);

  const source = typeof CBP.image === 'string' ? { uri: CBP.image } : CBP.image;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15
    },
    imageContainer: {
      width: normalize(92),
      height: normalize(92),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
      marginLeft: 20
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10

    },
    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: style.Text,
      fontSize: normalize(23),
      marginBottom: 10
    },
    description: {
      color: style.Text,
      fontSize: normalize(18)
    },
    currentMusic: {
      color: 'red'
    }
  });
  return (

    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        {/*  currentMusic.id === CBP.id && styles.currentMusic */}
        <Text style={[styles.title]}>{CBP.title}</Text>
        <Text style={[styles.description]}>{CBP.description}</Text>
      </View>
    </View>
  );
}

