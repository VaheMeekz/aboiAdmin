import { COUPON_DATA } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const couponActionName = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/coupon`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: COUPON_DATA,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};
