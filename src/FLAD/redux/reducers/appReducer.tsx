import Music from "../../Model/Music";
import { Spot } from "../../Model/Spot";
import { discoveriesTypes } from "../types/discoverieTypes";
import { favoritesTypes } from "../types/favoritesTypes";
import { spotifyTypes } from "../types/spotifyTypes";
import { spotTypes } from "../types/spotTypes";
let tmpMusic: Music[] = [
        new Music("03o8WSqd2K5rkGvn9IsLy2","Autobahn", "Sch", "https://images.genius.com/83b6c98680d38bde1571f6b4093244b5.1000x1000x1.jpg","https://p.scdn.co/mp3-preview/c55f95de81b8c3d0df04148da1b03bd38db56e8f?cid=774b29d4f13844c495f206cafdad9c86"),
        new Music("6DPrYPPGYK218iVIZDix3i","Freeze Raël", "Freeze Corleone", "https://intrld.com/wp-content/uploads/2020/08/freeze-corleone-la-menace-fanto%CC%82me.png","https://p.scdn.co/mp3-preview/a9f9cb19ac1fe6db0d06b67decf8edbb25895a33?cid=774b29d4f13844c495f206cafdad9c86"),
        new Music("5GFHFEASZeJF0gyWuDDjGE","Kratos", "PNL", "https://upload.wikimedia.org/wikipedia/en/a/a0/PNL_-_Dans_la_l%C3%A9gende.png","https://p.scdn.co/mp3-preview/9e854f4905c1228482e390169eb76d8520076b8f?cid=774b29d4f13844c495f206cafdad9c86"),
];
const initialState = {
  spot: [] as Spot[],
  favoriteMusic: tmpMusic,
  userCurrentMusic : null
}

const appReducer = (state = initialState, action : any) => {
  switch (action.type) {
      case favoritesTypes.GET_FAVORITE_MUSICS:
        return {...state, favoriteMusic: action.playload};
      case favoritesTypes.ADD_FAVORITE_MUSICS:
        return {...state, favoriteMusic: [action.playload, ...state.favoriteMusic]};
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