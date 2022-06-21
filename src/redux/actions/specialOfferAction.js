import { SPECIAL_OFFER } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const specialOfferAction = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/special-offer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: SPECIAL_OFFER,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};
