//Define your action creators that will be responsible for asynchronous operations

import { API_URL } from "../../fladConfig";


export type CreateSpotReqBody = {
  id : string; 
  name : string;
  artist : string;
  linkCover : string;
  user : string; 
}
  
// export const getSpotList = () => {
//     return async dispatch => {
//       try {
        
//         const spotPromise = await fetch(`${API_URL}/spotify/spot`);
//         const spotJson = await spotPromise.json();
//         const spotList: Spot[] = spotJson.map(spot => {
          
//         } );

//         dispatch(setNounoursList(spotList));
//       } catch (error) {
//         console.log('Error---------', error);
//       }
//     }
//   }