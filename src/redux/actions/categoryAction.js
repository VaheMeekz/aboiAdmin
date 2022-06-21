import { GETALL_CATEGORYS } from "../types";
import axios from "axios";
import { keys } from "../../keys";
import { unauthorization } from "../../middleware";

export const AllCategryItems = (pageItem) => (dispatch) => {
  axios
    .get(`${keys.API_URI}/category?page=${pageItem}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
      },
    })
    .then((resp) => {
      dispatch({
        type: GETALL_CATEGORYS,
        payload: resp.data.data,
      });
    })
    .catch((error) => unauthorization());
};

//   return async (dispatch) => {
//     const response = await axios.get(${baseUrl}/products/all,
//     );
//     dispatch({
//       type: GET_PRODUCTS,
//       payload: response.data,
//     });
//   };
// };
