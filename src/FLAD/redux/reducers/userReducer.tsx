import { userTypes } from "../types/userTypes";
const initialState = {
  loading: false,
  user: {}, // for user object
  userFladToken: null, // for storing the JWT
  userSpotifyToken : null,
  error: null,
  isLogedIn: false,
  }
  
  const userReducer = (state = initialState, action : any) => {
    switch (action.type) {
      // just for the navigation and speciafly use 
      // and 
      case userTypes.RESTORE_TOKEN:
        console.log(state.loading, "((((((((((((((((((((((((((((((((((((userRducer))))))))))))))))))))))))))))))))))))");  

        console.log(state.userFladToken, "userRducer");  
        console.log(state.loading, "((((((((((((((((((((((((((((((((((((userRducer))))))))))))))))))))))))))))))))))))");  

          return {
            ...state,
            userFladToken : action.playload,
            loading: true,
            // isLogedIn: true,
          };

      case userTypes.LOGIN:
        return {
          ...state,
          user :action.payload,
          isLogedIn: true 
        };
      case userTypes.SIGNUP:
      return {
        ...state,
        user :action.payload,
        isLogedIn: true 
      };
      // case USER_SIGNUP:
      //   return {...state, nounours: action.payload};
      case userTypes.USER_LOGOUT:
        return {...state,
          user :null,
          isLogedIn: false  }
      default:
        return state;
    }
  }
  export default userReducer

  