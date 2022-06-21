import { PRODUCT_DATA } from "../types";
import axios from "axios";
import { keys } from "../../keys";
import { unauthorization } from "../../middleware";
export const AllProductItems = (pageItem) => (dispatch) => {
  axios
    .get(`${keys.API_URI}/product?page=${pageItem}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      console.log(resp.data.data, "0000");
      dispatch({
        type: PRODUCT_DATA,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};
