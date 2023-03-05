import Music from "../../Model/Music";
import { Spot } from "../../Model/Spot";
import { favoritesTypes } from "../types/favoritesTypes";
import {spotTypes} from "../types/spotTypes";

export const getFavoritesMusic = (favoritesMusic: Music[]) => {
    return {
      type: favoritesTypes.GET_FAVORITE_MUSICS,
      playload: favoritesMusic,
    };
}
