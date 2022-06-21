import { CONTACT_INFO } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";

export const getcontactInfo = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/contact`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: CONTACT_INFO,
        payload: resp.data.data,
      });
    })

    .catch((error) => unauthorization());
};
