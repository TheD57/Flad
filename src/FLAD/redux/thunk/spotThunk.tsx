import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Spot } from "../../Model/Spot";
import SpotifyService from "../../services/spotify/spotify.service";
import { setSpotList, setUserCurrentMusic } from "../actions/spotActions";
const key = 'userToken';

export type CreateSpotReqBody = {
  id: string;
  name: string;
  artist: string;
  linkCover: string;
  user: string;
}
export const getSpotList = (resuestHandler: SpotifyService) => {

  //@ts-ignore
  return async dispatch => {
    try {
      //@ts-ignore
      const userToken: string = await SecureStore.getItemAsync(key);
      const headers = {
        'Authorization': 'Bearer ' + userToken
      };
      const data = await axios.get(
        "https://flad-api-production.up.railway.app/api/users/nextTo",
        { headers }
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
export const getCurrentUserMusic = (resuestHandler: SpotifyService) => {
  //@ts-ignore
  return async dispatch => {
    try {
      //@ts-ignore
      var currentTrackResponse = await resuestHandler.getUserCurrentMusic();
      if (!currentTrackResponse) {
        const recentlyTrackResponse = await resuestHandler.getUserRecentlyPlayedMusic();
        if (!recentlyTrackResponse) {
          throw new Error;
        } else {
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
export const searchMusic = async (resuestHandler: SpotifyService, search: string) => {

  return async (dispatch) => {
    return resuestHandler.searchMusic(search).then(musics => dispatch((musics))).catch(err => console.log("something goes wrong while searching : " + err));
  };
} 