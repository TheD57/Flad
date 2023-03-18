import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "../../Model/User";
import { userTypes } from "../types/userTypes";
const initialState = {
  loading: false,
  user: User, // for user object
  userFladToken: "", // for storing the JWT
  userSpotifyToken: null,
  error: null,
  isLogedIn: false,
  failedLogin: false,
  failedSignup: false,
  dark: null
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // just for the navigation and speciafly use 
    // and 
    case userTypes.RESTORE_TOKEN:
      const resp = (action.playload == "" ? false : true)
      console.log(resp, "si il ya le tokennen ou passssssssssss")
      return {
        ...state,
        userFladToken: action.playload,
        loading: true,
        isLogedIn: resp,
      };
    case userTypes.LOGIN:
      AsyncStorage.setItem('dark', JSON.stringify(false)).then(() => {
        console.log('La nouvelle clé et sa valeur ont été créées dans le localstorage');
      });
      console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");
      console.log(action.playload, "LOOGGIIINN");
      console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");
      return {
        ...state,
        user: action.playload,
        failedLogin: false,
        isLogedIn: true,
        dark: false
      };
    case userTypes.SIGNUP:
      AsyncStorage.setItem('dark', JSON.stringify(false)).then(() => {
        console.log('La nouvelle clé et sa valeur ont été créées dans le localstorage');
      });
      console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");

      console.log(action.playload, "SIGNNNNNUUUUPPPPPPP");
      console.log("++++++++++++++++++++++++++++++++++++++userRducer+++++++++++++++++++++++++++++3");
      return {
        ...state,
        user: action.playload,
        failedSignup: false,
        isLogedIn: true,
        dark: false
      };
    case userTypes.USER_LOGOUT:
      AsyncStorage.removeItem('dark').then(() => {
        console.log('La clé a été supprimée du localstorage');
      });
      return {
        ...state,
        user: null,
        isLogedIn: false
      }
    case userTypes.SAVE_SPOTIFY:
      return {
        ...state,
        userSpotifyToken: action.playload,
      };
    case userTypes.CHANGE_ERROR_LOGIN:
      return { ...state, failedLogin: true }
    case userTypes.CHANGE_ERROR_SIGNUP:
      return { ...state, failedSignup: true }
    case userTypes.CHANGE_MODE:
      return { ...state, dark: action.playload }
    default:
      return state;
  }
}
export default userReducer

