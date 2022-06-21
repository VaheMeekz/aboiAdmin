import { BLACK_LIST } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const getblackListAction = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/black-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: BLACK_LIST,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};
