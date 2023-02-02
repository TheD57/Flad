import React, {Component} from 'react';
import { Animated, StyleSheet, Text, View, FlatList , Image} from 'react-native';

type CustomCardMusic = { //Props
    image: ImageSource;
    title: string;
    description: string;
}

export default function CardMusic(CBP: CustomCardMusic) {
    const source = typeof CBP.image === 'string' ? { uri: CBP.image } : CBP.image;
    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
              <Image source={source} style={styles.image}/>
          </View>
          <View style={styles.textContainer}>
              <Text style={styles.title}>{CBP.title}</Text>
              <Text style={styles.description}>{CBP.description}</Text>
          </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 20
    },
    imageContainer: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20
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
      color: 'white',
      fontSize: 20,
      marginBottom: 10
    },
    description: {
      color: 'white',
      fontSize: 16
    }
  });