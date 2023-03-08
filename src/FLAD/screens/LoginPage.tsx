import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import normalize from '../components/Normalize';
import { userLogin } from '../redux/thunk/authThunk';
import { useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import { Credentials } from '../redux/actions/userActions';

// @ts-ignore
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default function loginPage() {
    const [sound, setSound] = useState<Audio.Sound>();
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/Click.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); 
      }
    const dispatch = useDispatch();

    const submitForm = () => {
        const credentials: Credentials = {
            email: username,
            password: password
          };
          //@ts-ignore
          dispatch(userLogin(credentials))
          playSound()
      }

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
                    <View>
                        <TextInput placeholder="Username"
        value={username}
        onChangeText={setUsername}style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/User.png')} style={styles.iconUser} />
                    </View>
                    <View>
                        <TextInput placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry style={[styles.input, styles.shadow]}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <View style={styles.rememberMeContainer}>
                        <TouchableOpacity style={[styles.checkbox, rememberMe ? styles.checkboxChecked : null]} onPress={toggleRememberMe}></TouchableOpacity>
                        <Text style={styles.rememberMeText}>SE SOUVENIR DE MOI</Text>
                    </View>
                    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={submitForm}>
                        <Image source={require("../assets/icons/Check.png")} style={styles.buttonImage}/>
                    </TouchableOpacity>
                    <View style={styles.inscriptionText}>
                        <Text style={{fontSize: normalize(18), color: 'white'}}>Tu n'as pas de compte? </Text>
                        <TouchableOpacity 
                            // @ts-ignore
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{fontSize: normalize(18), color: '#406DE1', textDecorationLine: 'underline'}}>S'inscrire</Text>
                        </TouchableOpacity>
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
        width: normalize(324),
        height: normalize(162),
        alignSelf: 'center',
        marginBottom: '25%'
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
    text: {
        fontWeight: 'bold',
        fontSize: normalize(29),
        alignSelf: 'center',
        color: 'white',
        marginBottom: 15
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 5
    },
    versionText: {
        position: 'absolute',
        top: 40,
        right: 20,
        color: 'gray',
        fontWeight: 'bold',
        fontSize: normalize(17)
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        marginTop: normalize(10)
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
        fontSize: normalize(19),
        color: 'white'
    },
    checkboxChecked: {
        backgroundColor: 'white'
    },
    inscriptionText: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        bottom: normalize(-98)
    }
})