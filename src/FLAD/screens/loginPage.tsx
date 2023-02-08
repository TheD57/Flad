import React, {Component} from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput } from 'react-native';

export default function loginPage() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/images/Background.png")} resizeMode="cover" style={styles.image}>
                <Image source={require("../assets/icons/Logo_White_Flad.png")} style={styles.imageLogo}/>
                <Text style={styles.text}>Se connecter</Text>
                <TextInput placeholder='E-Mail' style={styles.input}>
                    {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
                </TextInput>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,    
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    imageLogo: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginTop: 50
    },
    input: {
        width: 300,
        height: 30,
        borderRadius: 10,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 10,
        alignSelf: 'center'

    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'white'
    }
})