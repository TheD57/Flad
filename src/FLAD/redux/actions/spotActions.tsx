import {spotTypes} from "../types/spotTypes";

export const setSpotList = (spotList: Spot[]) => {
    return {
      type: spotTypes.FETCH_SPOT,
      payload: spotList,
    };
  }