import { STATISTICA_DATA } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const statisticData = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/statistic`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      console.log(resp.data, "2222");
      dispatch({
        type: STATISTICA_DATA,
        payload: resp.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};
