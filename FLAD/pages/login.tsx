import { View, Text, Image, Animated ,PanResponder, Dimensions, StyleSheet, ImageBackground, Button, Pressable, Touchable, TouchableOpacity, Modal, SafeAreaView, TextInput, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as AuthSession from 'expo-auth-session';

import Card from '../components/Card';
import axios from 'axios';
import { cards as cardArray } from '../FakeData/data'
import FladButton from '../components/button/button';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

const SCREEN_WIDTH = Dimensions.get('window').width

import * as SecureStore from 'expo-secure-store';

interface LoginProps {
}
interface Params {
    [key: string]: string;
  }
  
  interface Profile {
    display_name: string;
    email: string;
    id: string;
  }
//generate random string
  export const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';

  WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


async function save(key : string, value : string) {
  await SecureStore.setItemAsync(key, value);
}


export default function Login() {  
    // const [advice, setAdvice] = useState("dd");
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
  
    const getAdvice = async () => { axios.get("http://localhost:8080/api/spotify/exchange")
            .then(response => {
              console.log(response.data.message);

                // setAdvice(response.data.message);
            }).catch(function (error) {
                console.log(error);
            });
    };  
    React.useEffect(() => {
      if (response && response.type === 'success') {
        const auth = response.params.access_token;
        const storageValue = JSON.stringify(auth);
  
        if (Platform.OS !== 'web') {
          // Securely store the auth on your device
          save(MY_SECURE_AUTH_STATE_KEY, storageValue);
        }
      }
    }, [response]);

    return (
        <View style={styles.centeredView}>
            <Text style={styles.textStyle}>Hello flad test logIn</Text>
                <Button disabled={!request} title="Login"
                  onPress={() => {
                    promptAsync();
                  }}
                />
        </View>
      );
};
    
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    header :{
        alignItems : 'flex-end',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      close :{
        alignSelf : 'flex-end',
        backgroundColor : 'red',
        justifyContent : 'center'
      }
   
})
  
