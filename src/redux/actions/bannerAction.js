import { BANNER_HOME } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";

export const bannerInfo = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/slider`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: BANNER_HOME,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};
