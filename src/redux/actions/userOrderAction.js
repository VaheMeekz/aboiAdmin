import { USER_ORDER } from "../types";
import keys from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const userorderdata = () => (dispatch) => {
  const token = JSON.parse(localStorage.getItem(keys.AUTH));
  axios
    .get(`${keys.BACKEND_URI}api/ordering`, {
      headers: {
        "x-access-token": token.token,
      },
    })
    .then((resp) => {
      dispatch({
        type: USER_ORDER,
        payload: resp.data.history,
      });
    })
    .catch((error) => unauthorization());
};
