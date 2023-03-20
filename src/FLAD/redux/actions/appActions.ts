import Music from "../../Model/Music";
import { favoritesTypes } from "../types/favoritesTypes";

export const getFavoritesMusic = (favoritesMusic: Music[]) => {
  return {
    type: favoritesTypes.GET_FAVORITE_MUSICS,
    playload: favoritesMusic,
  };
}
export const addFavoritesMusic = (favoritesMusic: Music) => {
  return {
    type: favoritesTypes.ADD_FAVORITE_MUSICS,
    playload: favoritesMusic,
  };
}
