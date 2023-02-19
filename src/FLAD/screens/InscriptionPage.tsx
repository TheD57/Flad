import React, {Component, useState } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default function InscriptionPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <ImageBackground source={require("../assets/images/Background.png")} resizeMode="cover" style={styles.image}>
                    <Text style={styles.versionText}>
                        v2.0
                    </Text>
                    <Image source={require("../assets/icons/Logo_White_Flad.png")} style={styles.imageLogo}/>
                    <Text style={styles.text}>S'INSCRIRE</Text>
                    <View style={styles.containerInput}>
                        <TextInput style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/User.png')} style={styles.iconUser} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <TouchableOpacity style={[styles.buttonSpotify, styles.shadow]}>
                        <Text style={styles.textIntoButton}>Lier compte</Text>
                        <Image source={require("../assets/icons/icons/Spotify.png")} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => console.log("Oui")}>
                        <Image source={require("../assets/icons/icons/next.png")} style={styles.buttonImage}/>
                    </TouchableOpacity>
                    <View style={styles.inscriptionText}>
                        <Text style={{fontSize: 16, color: 'white'}}>Tu as déjà un compte? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{fontSize: 16, color: '#406DE1', textDecorationLine: 'underline'}}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1   
    },
    containerInput: {
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    imageLogo: {
        width: 280,
        height: 140,
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: -20
    },
    button: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 86,
        height: 86,
        borderRadius: 21
    },
    buttonImage: {
        width: 40,
        height: 40
    },
    versionText: {
        position: 'absolute',
        top: 40,
        right: 20,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 15
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        color: 'white',
        marginBottom: 15
    },
    textIntoButton: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        marginRight: 10
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
    },
    input: {
        width: 300,
        height: 42,
        borderRadius: 30,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 20 
    },
    iconUser : {
        position: 'absolute',
        width: 20,
        height: 20,
        left: '17%',
        bottom: '50%'
    },
    iconLock : {
        position: 'absolute',
        width: 20,
        height: 20,
        left: '17%',
        bottom: '50%'
    },
    inscriptionText: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        bottom: -80
    },
    buttonSpotify: {
        width: 300,
        height: 42,
        backgroundColor: '#24CF5F',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        flexDirection: 'row'
    }
})