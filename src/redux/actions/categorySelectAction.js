import { CATEGORY_SELECT } from "../types";
import { keys } from "../../keys";
import axios from "axios";
import { unauthorization } from "../../middleware";
export const categorySelectAction = () => (dispatch) => {
  axios
    .get(`${keys.API_URI}/category/category-select`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: CATEGORY_SELECT,
        payload: resp.data.data,
      });
    })
    .catch((error) => {
      unauthorization();
    });
};
