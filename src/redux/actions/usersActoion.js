import { USER_DATA } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const userActionData = (pageItem) => (dispatch) => {
  axios
    .get(`${keys.API_URI}/user?page=${pageItem}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: USER_DATA,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};
