import React, {Component, useState } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, Button, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default function loginPage() {
    const [rememberMe, setRememberMe] = useState(false);

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
                <Text style={styles.text}>SE CONNECTER</Text>
                <TextInput placeholder='E-Mail' style={[styles.input, styles.shadow]}>
                </TextInput>
                <TextInput placeholder='Mot de passe' style={[styles.input, styles.shadow]}>
                </TextInput>
                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity style={[styles.checkbox, rememberMe ? styles.checkboxChecked : null]} onPress={toggleRememberMe}></TouchableOpacity>
                    <Text style={styles.rememberMeText}>SE SOUVENIR DE MOI</Text>
                </View>
                <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => console.log("Oui")}>
                    <Image source={require("../assets/icons/Check.png")} style={styles.buttonImage}/>
                </TouchableOpacity>
                <View style={styles.inscriptionText}>
                    <Text style={{fontSize: 16, color: 'white'}}>Tu n'as pas de compte? </Text>
                    <Text style={{fontSize: 16, color: '#406DE1', textDecorationLine: 'underline'}}>S'inscrire</Text>
                </View>
            </ImageBackground>
        </View>
        </DismissKeyboard>
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
        width: 280,
        height: 140,
        alignSelf: 'center',
        marginBottom: 100
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
    input: {
        width: 300,
        height: 42,
        borderRadius: 30,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20 
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        color: 'white',
        marginBottom: 15
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
    versionText: {
        position: 'absolute',
        top: 40,
        right: 20,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 15
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 10
    },
    rememberMeText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white'
    },
    checkboxChecked: {
        backgroundColor: 'white'
    },
    inscriptionText: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        bottom: -80
    }
})