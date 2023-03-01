//Define your action creators that will be responsible for asynchronous operations

import axios from "axios";
import { json } from "express";
import { useEffect } from "react";
import { API_URL } from "../../fladConfig";
import { Credentials, CredentialsRegister, restoreToken, setLoginState } from "../actions/userActions";
import * as SecureStore from 'expo-secure-store';

const key = 'userToken';
  
export const registerUser = ( resgisterCredential : CredentialsRegister) => {
    //@ts-ignore
    return async dispatch => {
      try {
        console.log(resgisterCredential);

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
          // await SecureStore.setItemAsync(key, token);
          const headers = {
                  'Authorization': 'Bearer ' + token};
          const user = await axios.get(
            "https://flad-api-production.up.railway.app/api/users",
            {headers}
              )
          dispatch(setLoginState(resp.data.user) ); // our action is called here
            // console.log(user.data);
          // dispatch(setLoginState(user.data) ); // our action is called here
          } else {
          console.log('Login Failed', 'Username or Password is incorrect');
          }


          // if (resp.data.msg === 'success') { // response success checking logic could differ
          //   await SecureStore.setItemAsync(key, resp.data.token);
          //   dispatch(setLoginState(resp.data.user) ); // our action is called here
          // } else {
          //   console.log('Login Failed', 'Username or Password is incorrect');
          // }

      } catch (error) {
        console.log('Error---------', error);
      }
    }
  }
export const userLogin = ( loginCredential : Credentials) => {
//@ts-ignore
return async dispatch => {
    try {
      console.log(loginCredential);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        }
        // const resppp = await axios.get(`${API_URL}/toto`);
        // console.log(resppp.data, "sddsd");
        
    const resp = await axios.post(
      "https://flad-api-production.up.railway.app/api/users/login",
        loginCredential,
        config
        )
        console.log("====================================================================================")
        console.log(resp.data)
        console.log("====================================================================================")
        if (resp.data.token) {
          console.log(resp.data.token);
          const token = resp.data.token;
        await SecureStore.setItemAsync(key, token);
        const headers = {
                'Authorization': 'Bearer ' + token};
        
        const user = await axios.get(
          "https://flad-api-production.up.railway.app/api/users",
          {headers}
            )
        // dispatch(setLoginState(resp.data.user) ); // our action is called here
          
        dispatch(setLoginState(user.data) ); // our action is called here
        } else {
        console.log('Login Failed', 'Username or Password is incorrect');
        }

    } catch (error) {
    console.log('Error---------', error);
    }
}
}
 
export const getRefreshToken = () => {
    //@ts-ignore
    return async dispatch => {
        try {
          let userToken : string | null = await SecureStore.getItemAsync(key);
          console.log("==========key ==================");
          console.log(userToken);
          console.log("==========key ==================");

          if (userToken) {
          console.log("==========key2 ==================");
            console.log(userToken);
          console.log("==========key ==================");

            dispatch(restoreToken(userToken) ); 
    
          } else {
            console.log("==========OOOOOORRRRRRRRHHHHHHHHHH ==================");
            const empty = "";
            dispatch(restoreToken(empty) ); 

            console.log("merddee");            
          }
        } catch (e) {
            console.log('Error---------', e);
        }
    }
}
     
     // const logIn = (email, password) => {
  //   const action = (dispatch) => {
  //     if (email === user.email && password === user.password) {
  //       dispatch(setLoggedInState(true));
  //       return true;
  //     }
  //     dispatch(setLoggedInState(false));
  //     return false;
  //   };
  //   return action;
  // };
  // better
  async function save(key : string, value : string) {
    await SecureStore.setItemAsync(key, value);
  }