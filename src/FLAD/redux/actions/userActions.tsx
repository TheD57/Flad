import { User } from "../../Model/User";
import { userTypes } from "../types/userTypes";


export interface Credentials {
  email : string,
  password : string
}
export interface CredentialsRegister {
  email : string,
  password : string,
  name : string,
  idFlad : string,
  idSpotify : string
}
// export const setLoggedInState = loggedInState => (
//   {
//     type: types.SET_LOGGED_IN_STATE,
//     loggedInState,
//   }
// );
export const setLoginState = (cred : Credentials) => {
  return {
    type: userTypes.LOGIN, 
    playload : cred
  };
}

export const restoreToken = (token : string) => {
  return {
    type: userTypes.RESTORE_TOKEN, 
    playload : token
  };
}
export const userSignUp = (user : User) => {
    return {
      type: userTypes.LOGIN, 
      playload : user
    };
  }

  export const UserLogout = () => {
    return {
      type: userTypes.USER_LOGOUT, 
    };
  }
 
  export const userChangeMode = () => {
    return {
      type: userTypes.CHANGE_MODE, 
    };
  }