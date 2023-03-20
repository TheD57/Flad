import axios from "axios";
import { Spot } from "../../Model/Spot";

export const likeSpot = async (spot : Spot) => {
    // 
    return async (dispatch) => {
        // const fetchAll = async () => {
        //     const data = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/search/${search}`, options)
        //         .then(response => response.json());
  
        //     const fetchPromises = data.map(it =>
        //         fetch(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${it.kanji.character}`, options)
        //             .then(detail => detail.json())
        //     );
  
        //     const kanjis = await Promise.all(fetchPromises)
        //         .then(details => details.map(detail_data => KanjiMapper.ApiJsonToKanji(detail_data)));
  
        //     return kanjis;
        // };
        
        axios.post("osdj").then( responce => {if(responce.status == 200){
            dispatch(true);
        } } ).catch(error => {
            console.log("something goes wrong while searching : " + error);
            ;})
  
  
    };
  } 