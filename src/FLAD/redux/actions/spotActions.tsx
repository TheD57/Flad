import Music from "../../Model/Music";
import { Spot } from "../../Model/Spot";
import { spotifyTypes } from "../types/spotifyTypes";
import { spotTypes } from "../types/spotTypes";

export const setSpotList = (spotList: Spot[]) => {
  return {
    type: spotTypes.FETCH_SPOT,
    playload: spotList,
  };
}

export const setUserCurrentMusic = (currentMusic: Music) => {
  return {
    type: spotifyTypes.GET_USER_CURRENT_MUSIC,
    playload: currentMusic,
  };
}