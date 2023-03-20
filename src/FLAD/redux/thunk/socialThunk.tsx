import axios from "axios";
import { Spot } from "../../Model/Spot";

export const likeSpot = async (spot: Spot) => {
    return async (dispatch) => {
        axios.post("osdj").then(responce => {
            if (responce.status == 200) {
                dispatch(true);
            }
        }).catch(error => {
            console.log("something goes wrong while searching : " + error);
            ;
        })


    };
} 