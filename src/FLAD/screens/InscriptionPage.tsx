import React, {Component, useState } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import normalize from '../components/Normalize';

// @ts-ignore
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
                    <View>
                        <TextInput style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/User.png')} style={styles.iconUser} />
                    </View>
                    <View>
                        <TextInput style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <View>
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
                    <View style={styles.connectionText}>
                        <Text style={{fontSize: normalize(18), color: 'white'}}>Tu as déjà un compte? </Text>
                        <TouchableOpacity 
                            // @ts-ignore
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{fontSize: normalize(18), color: '#406DE1', textDecorationLine: 'underline'}}>Se connecter</Text>
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
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    imageLogo: {
        width: normalize(324),
        height: normalize(162),
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: -20
    },
    button: {
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: normalize(100),
        height: normalize(100),
        borderRadius: 21
    },
    buttonImage: {
        width: normalize(46),
        height: normalize(46),
    },
    versionText: {
        position: 'absolute',
        top: 40,
        right: 20,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: normalize(17)
    },
    text: {
        fontWeight: 'bold',
        fontSize: normalize(29),
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
        width: normalize(350),
        height: normalize(50),
        borderRadius: 30,
        color: 'black',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 20 
    },
    iconUser : {
        position: 'absolute',
        width: 20,
        height: 20,
        left: normalize(80),
        bottom: '50%'
    },
    iconLock : {
        position: 'absolute',
        width: 20,
        height: 20,
        left: normalize(80),
        bottom: '50%'
    },
    connectionText: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        bottom: '-20%'
    },
    buttonSpotify: {
        width: normalize(350),
        height: normalize(50),
        backgroundColor: '#24CF5F',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        flexDirection: 'row'
    }
})