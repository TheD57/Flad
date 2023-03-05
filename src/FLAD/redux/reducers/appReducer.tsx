import Music from "../../Model/Music";
import { Spot } from "../../Model/Spot";
import { discoveriesTypes } from "../types/discoverieTypes";
import { favoritesTypes } from "../types/favoritesTypes";
import { spotifyTypes } from "../types/spotifyTypes";
import { spotTypes } from "../types/spotTypes";

const initialState = {
    spot: [] as Spot[],
    favoriteMusic: [] as Music [],
    userCurrentMusic : null
  }
  
  const appReducer = (state = initialState, action : any) => {
    switch (action.type) {
      case favoritesTypes.ADD_FAVORITE_MUSICS:
        return {...state, favoriteMusic: state.favoriteMusic.push(action.payload)};
      case favoritesTypes.REMOVE_FAVORITE_MUSICS:
        return {...state, favoriteMusic: state.favoriteMusic};
      case spotTypes.FETCH_SPOT:
        return {...state, spot: action.payload};
      case discoveriesTypes.FETCH_DISCOVERIES:  
        return;
      case spotifyTypes.GET_USER_CURRENT_MUSIC:
        return {...state, userCurrentMusic: action.payload}; 
      default:
        return state; 
    }
  }

  export default appReducer