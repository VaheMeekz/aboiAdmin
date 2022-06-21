import { DELEVERY_DATA } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const getdelevery = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/delivery`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: DELEVERY_DATA,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      console.log(error, "eroreeeeeeeeeeee");
      // unauthorization();
    });
};
