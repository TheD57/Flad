//Define your action creators that will be responsible for asynchronous operations

import axios from "axios";
import { API_URL } from "../../fladConfig";
import { RequestHandler } from "../../services/spotify/spotifyRequestHandler/utils";
import * as SecureStore from 'expo-secure-store';
import { Spot } from "../../Model/Spot";
import SpotifyService from "../../services/spotify/spotify.service";
import * as Location from 'expo-location';
import { setSpotList, setUserCurrentMusic } from "../actions/spotActions";
import Music from "../../Model/Music";
import { getFavoritesMusic } from "../actions/appActions";
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
export const searchMusic = async (resuestHandler : SpotifyService,search: string) => {
  // 
  return async (dispatch) => {
      // const fetchAll = async () => {
      //     const data = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/search/${search}`, options)
      //         .then(response => response.json());

      //     const fetchPromises = data.map(it =>
      //         fetch(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${it.kanji.character}`, options)
      //             .then(detail => detail.json())
      //     );

      //     const kanjis = await Promise.all(fetchPromises)
      //         .then(details => details.map(detail_data => KanjiMapper.ApiJsonToKanji(detail_data)));

      //     return kanjis;
      // };

      return resuestHandler.searchMusic(search).then(musics => dispatch((musics))).catch(err => console.log("something goes wrong while searching : " + err));


  };
} 
// export const fetchFavoritesMusic = () => {
//     //@ts-ignore
//   return async dispatch => {
//     const MovieList: Music[] = [
//       // new Music("La pharmacie", "Jul",require("../assets/images/jul.png")),
//       // new Music("Deux frères", "PNL", require("../assets/images/pnl.png")),
//       new Music("Bambina", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
//       new Music("Stratos", "Kekra", "https://images.genius.com/ddc9cadedd1d4cef0860aaa85af9cd46.705x705x1.png"),
//       new Music("Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg"),
//       new Music("Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png"),
//       // new Music("Blanka", "PNL", require("../assets/images/pnl.png")),
//       new Music("Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png"),
//     ] ;
//     dispatch(getFavoritesMusic(MovieList));
//   }
// }

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