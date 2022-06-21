import { ABOUT_INFO } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const getaboutInfo = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/about`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: ABOUT_INFO,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};
