import { ORDER_INFO, SEARCHED_DATA } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const orderDataAction = (pageItem) => (dispatch) => {
  axios
    .get(`https://abionew.herokuapp.com/api/admin/orders?page=${pageItem}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      console.log(resp.data.data, "orderaction");
      dispatch({
        type: ORDER_INFO,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};

export const searchedData = (data) => (dispatch) => {
  dispatch({ type: SEARCHED_DATA, payload: data });
};
