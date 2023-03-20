import axios from "axios";
import { API_URL } from "../../fladConfig";
import { Credentials, CredentialsRegister, restoreToken, setLoginState, UserLogout, userChangeMode, userSignUp, ChangeErrorLogin, ChangeErrorSignup } from "../actions/userActions";
import * as SecureStore from 'expo-secure-store';
import { UserFactory } from "../../Model/factory/UserFactory";

const key = 'userToken';

export const registerUser = (resgisterCredential: CredentialsRegister) => {
  //@ts-ignore
  return async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const resp = await axios.post(
        `${API_URL}/api/users/register`,
        resgisterCredential,
        config
      )

      if (resp.data.token) {
        console.log(resp.data.token);
        const token = resp.data.token;
        const headers = {
          'Authorization': 'Bearer ' + token
        };
        const user = await axios.get(
          "https://flad-api-production.up.railway.app/api/users",
          { headers }
        )
        dispatch(userSignUp(UserFactory.JsonToModel(user.data)));
      } else {
        console.log('Login Failed', 'Username or Password is incorrect');
      }

    } catch (error) {
      dispatch(ChangeErrorSignup())
    }
  }
}

export const userLogin = (loginCredential: Credentials) => {
  //@ts-ignore
  return async dispatch => {
    try {
      console.log(loginCredential);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const resp = await axios.post(
        "https://flad-api-production.up.railway.app/api/users/login",
        loginCredential,
        config
      )
      if (resp.data.token) {
        const token = resp.data.token;
        await SecureStore.setItemAsync(key, token);
        const headers = {
          'Authorization': 'Bearer ' + token
        };

        const user = await axios.get(
          "https://flad-api-production.up.railway.app/api/users",
          { headers }
        )
        console.log(user.data);

        dispatch(setLoginState(user.data));
      } else {
        console.log('Login Failed', 'Username or Password is incorrect');
      }

    } catch (error) {
      dispatch(ChangeErrorLogin())
    }
  }
}

export const getRefreshToken = () => {
  //@ts-ignore
  return async dispatch => {
    try {
      let userToken: string | null = await SecureStore.getItemAsync(key);

      if (userToken) {
        dispatch(restoreToken(userToken));
      } else {
        const empty = "";
        dispatch(restoreToken(empty));
      }
    } catch (e) {
      console.log('Error---------', e);
    }
  }
}


export const DeleteToken = () => {
  //@ts-ignore
  return async dispatch => {
    try {
      await SecureStore.deleteItemAsync(key);
      dispatch(UserLogout());
    } catch (e) {
      console.log('Error deleting token', e);
    }
  }
}

export const ChangeMode = (value: boolean) => {
  //@ts-ignore
  return async dispatch => {
    dispatch(userChangeMode(value));
  }
}

export const ChangeImageUserCurrent = (value: ImagePicker) => {
  //@ts-ignore
  return async dispatch => {
    dispatch(userChangeImage(value));
  }
}