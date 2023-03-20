import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import React from 'react'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store';


//generate random string
export const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey'

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

// save the spotifyToken
async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}


export default function Login() {
  const [request] = useAuthRequest(
    {
      responseType: AuthSession.ResponseType.Token,
      clientId: '1f1e34e4b6ba48b388469dba80202b10',
      scopes: ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-currently-playing', 'user-read-recently-played', 'playlist-modify-public', 'ugc-image-upload', 'user-modify-playback-state'],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'https://auth.expo.io/@anonymous/FLAD-7eafd441-fd6b-4fb6-924c-ec2b0ed5ce6d',
        useProxy: true
      })

    },
    discovery
  );

  const scopesArr = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-currently-playing', 'user-read-recently-played', 'playlist-modify-public', 'ugc-image-upload', 'user-modify-playback-state'];
  const scopes = scopesArr.join(' ');
  //work so use this for my implementation
  const getAuthorizationCode = async () => {
    try {
      const redirectUrl = "https://auth.expo.io/@anonymous/FLAD-7eafd441-fd6b-4fb6-924c-ec2b0ed5ce6d"
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
      return result.params.code;
    } catch (err) {
      console.error(err)
    }
  }
  const getTokens = async () => {
    try {
      const authorizationCode = await getAuthorizationCode()
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + (Buffer.from('1f1e34e4b6ba48b388469dba80202b10' + ':' + '779371c6d4994a68b8dd6e84b0873c82').toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https://auth.expo.io/@anonymous/FLAD-7eafd441-fd6b-4fb6-924c-ec2b0ed5ce6d`,
      });
      const responseJson = await response.json()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <View style={styles.centeredView}>
      <Text style={styles.textStyle}>Hello flad test logIn</Text>
      <Button disabled={!request} title="Login"
        onPress={() => {
          getTokens()
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
  header: {
    alignItems: 'flex-end',
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
  close: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    justifyContent: 'center'
  }

})

