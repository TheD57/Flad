//Define your action creators that will be responsible for asynchronous operations

import axios from "axios";
import { API_URL } from "../../fladConfig";
import { RequestHandler } from "../../services/spotify/spotifyRequestHandler/utils";
import * as SecureStore from 'expo-secure-store';
import { Spot } from "../../Model/Spot";
import SpotifyService from "../../services/spotify/spotify.service";
import * as Location from 'expo-location';
import { setSpotList, setUserCurrentMusic } from "../actions/spotActions";
const key = 'userToken';

export type CreateSpotReqBody = {
  id : string; 
  name : string;
  artist : string;
  linkCover : string;
  user : string; 
}
export const getSpotList = (resuestHandler : SpotifyService) => {
  
//@ts-ignore
return async dispatch => {
    try {
        
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    //   const actualUser = MyApp.controller.getIdDafl();
    // const actualSong = MyApp.controller.getCurrentMusic().id;
    // const current = await new Promise<Position>((resolve, reject) => {
    //   Geolocation.getCurrentPosition(resolve, reject);
    // });


      //@ts-ignore
        var userToken : string = await SecureStore.getItemAsync(key);
        const headers = {
          'Authorization': 'Bearer ' + userToken};
        const data = await axios.get(
          "https://flad-api-production.up.railway.app/api/users/nextTo",
          {headers}
            )
        if (data.data.token) {
          const spotsData: { [userId: string]: string } = {};

          for (const item of data.data) {
            spotsData[item.user] = item.music;
          }
          const spots = await Promise.all(
            Object.entries(spotsData).map(async ([userId, value]) => {
              const completeMusic = await resuestHandler.getMusicById(value);
              return new Spot(userId, completeMusic);
            })
          );
      
        dispatch(setSpotList(spots)); // our action is called here
        } else {
        console.log('Login Failed', 'Username or Password is incorrect');
        }

    } catch (error) {
    console.log('Error---------', error);
    }
}
}
export const getCurrentUserMusic = (resuestHandler : SpotifyService)=> {
  //@ts-ignore
  return async dispatch => {
    try {
        //@ts-ignore
      var currentTrackResponse = await resuestHandler.getUserCurrentMusic();
      if (!currentTrackResponse){
        const recentlyTrackResponse = await resuestHandler.getUserRecentlyPlayedMusic();
        if(!recentlyTrackResponse){
          throw new Error;
        }else{
          currentTrackResponse = recentlyTrackResponse;
        }
      }
      const completeMusic = await resuestHandler.getMusicById(currentTrackResponse);
      dispatch(setUserCurrentMusic(completeMusic));
    }
    catch (error) {
      console.log('Error---------', error);
    }
}
}
// export const getSpotList = () => {
//     return async dispatch => {
//       try {
        
//         const spotPromise = await fetch(`${API_URL}/spotify/spot`);
//         const spotJson = await spotPromise.json();
//         const spotList: Spot[] = spotJson.map(spot => {
          
//         } );

//         dispatch(setNounoursList(spotList));
//       } catch (error) {
//         console.log('Error---------', error);
//       }
//     }
//   }