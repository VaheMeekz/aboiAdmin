import { GIFT_CARD } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const giftCardActionName = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/gift-card`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: GIFT_CARD,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};
