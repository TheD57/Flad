import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import normalize from '../components/Normalize';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { registerUser } from '../redux/thunk/authThunk';
import { useDispatch } from 'react-redux';
import { CredentialsRegister } from '../redux/actions/userActions';
import { Buffer } from 'buffer';
import SpotifyService from '../services/spotify/spotify.service';

// @ts-ignore
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
authorizationEndpoint: 'https://accounts.spotify.com/authorize',
tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
// save the spotifyToken
async function save(key : string, value : string) {
await SecureStore.setItemAsync(key, value);
}


export default function InscriptionPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();
    const [spotifyToken, setSpotifyToken] = useState('');
    const [spotifyID, setSpotifyIds] = useState('')

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    }
   
//spotify auth
    const [request, response, promptAsync] = useAuthRequest(
        {
          responseType: AuthSession.ResponseType.Token,
          clientId: '1f1e34e4b6ba48b388469dba80202b10',
          scopes: ['user-read-private','user-read-email','user-read-playback-state','user-read-currently-playing','user-read-recently-played','playlist-modify-public','ugc-image-upload','user-modify-playback-state'],
          redirectUri: makeRedirectUri({
            scheme: 'flad'
          }),
        },
        discovery
      );
    useEffect(() => {
        if (response && response.type === 'success') {
          const auth = response.params.access_token;
          const storageValue = JSON.stringify(auth);
    
          if (Platform.OS !== 'web') {
            // Securely store the auth on your device
            save(MY_SECURE_AUTH_STATE_KEY, storageValue);
          }
        }
      }, [response]);

      const dispatch = useDispatch();

      const submitForm = () => {
        const credentials: CredentialsRegister = {
            email: email,
            password: password,
            idSpotify : spotifyToken,
            name : username,
            idFlad : "3030"
          };
        //@ts-ignore
        dispatch(registerUser(credentials))
      }
      const scopesArr = ['user-read-private','user-read-email','user-read-playback-state','user-read-currently-playing','user-read-recently-played','playlist-modify-public','ugc-image-upload','user-modify-playback-state'];
const scopes = scopesArr.join(' ');
    //work so use this for my implementation
    const getAuthorizationCode = async () => {
      try {
        const redirectUrl = "https://auth.expo.io/@anonymous/FLAD-7eafd441-fd6b-4fb6-924c-ec2b0ed5ce6d"; //this will be something like https://auth.expo.io/@your-username/your-app-slug
        const result = await AuthSession.startAsync({
          authUrl:
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            "1f1e34e4b6ba48b388469dba80202b10" +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirectUrl),
        })
        console.log("=================grant code ==============<");

        console.log(result);
        console.log("=================grant code ==============<");

        return result.params.code;
      } catch (err) {
        console.error(err)
      }
    }
    const getAuthorizationCode2 = async () => {
      try {
        const result = await AuthSession.startAsync({
          authUrl:'https://flad-api-production.up.railway.app/api/spotify/exchange'
        })
        console.log("=================grant code ==============<");

        console.log(result);
        console.log("=================grant code ==============<");

        return result.params.code;
      } catch (err) {
        console.error(err)
      }
    }
    const getTokens2 = async () => {
      try {
        const authorizationCode = await getAuthorizationCode2() //we wrote this function above
        console.log(authorizationCode, "shhhhhhhhhhhhhheeeeeeeeeeeeeeeetttttttttttt");
        const response = await fetch('https://flad-api-production.up.railway.app/api/spotify/callback');
        const responseJson = await response.json();
        console.log(responseJson, "okkkkkkkkkkkkkkk") ;
        // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = responseJson;
        
        await setSpotifyToken(accessToken);

        console.log(spotifyToken);
      } catch (err) {
        console.error(err);
      }
    }
    const getTokens = async () => {
      try {
        const authorizationCode = await getAuthorizationCode() //we wrote this function above
        console.log(authorizationCode, "shhhhhhhhhhhhhheeeeeeeeeeeeeeeetttttttttttt");
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + (Buffer.from('1f1e34e4b6ba48b388469dba80202b10' + ':' + '779371c6d4994a68b8dd6e84b0873c82').toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https://auth.expo.io/@anonymous/FLAD-7eafd441-fd6b-4fb6-924c-ec2b0ed5ce6d`,
        });
        const responseJson = await response.json();
        console.log(responseJson, "okkkkkkkkkkkkkkk") ;
        // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = responseJson;
        await setSpotifyToken(accessToken);
        save(MY_SECURE_AUTH_STATE_KEY, accessToken);
        testService(accessToken);
        console.log(spotifyToken);
      } catch (err) {
        console.error(err);
      }
    }

    const testService = async (token : string) =>{
        try {
          const serviceTest = new SpotifyService(token);
            console.log("==============Test Service 1 ============");
            const respSearch = await serviceTest.searchMusic("Parapluie Tiakola");
            console.log("===================repoonce=========================");
            console.log(respSearch);
          console.log("============================================");
            console.log("==============Test Service 2 ============");
            const respFull = await serviceTest.getMusicById(respSearch[0].id);
            console.log("===================repoonce=========================");
            console.log(respFull);
          console.log("============================================");
            console.log("==============Test Service 3 ============");
            const respSimilar = await serviceTest.getSimilarTrack(respSearch[0].id);
            console.log("===================repoonce=========================");
            console.log(respSimilar);
          console.log("============================================");
          console.log("============================================");

        } catch (error) {
          console.log("==============Test Service Error============");
          console.error(error);
          console.log("============================================");

        }

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
                        <TextInput style={[styles.input, styles.shadow]} placeholder="Username"
        value={username}
        onChangeText={setUsername}/>
                        <Image source={require('../assets/icons/icons/User.png')} style={styles.iconUser} />
                    </View>
                    <View>
                        <TextInput style={[styles.input, styles.shadow]} placeholder="Email"
        value={email}
        onChangeText={setEmail}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <View>
                        <TextInput style={[styles.input, styles.shadow]} placeholder="Password"
        value={password} secureTextEntry={true} 
        onChangeText={setPassword}/>
                        <Image source={require('../assets/icons/icons/lock.png')} style={styles.iconLock} />
                    </View>
                    <TouchableOpacity onPress={async() => {
                    await getTokens();
                  }} style={[styles.buttonSpotify, styles.shadow]}>
                        <Text style={styles.textIntoButton}>Lier compte</Text>
                        <Image source={require("../assets/icons/icons/Spotify.png")} style={{width: normalize(35), height: normalize(35)}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => submitForm()}>
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
        marginBottom: normalize(58),
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
        fontSize: normalize(17),
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
        bottom: normalize(-98)
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
