import { QUESTION_INFO } from "../types";
import keys from "../../keys";
import axios from "axios";

export const getinfoQuestion = () => (dispatch) => {
  QUESTION_INFO
    ? axios
        .get(`${keys.BACKEND_URI}api/faq`)
        .then((resp) => {
          console.log(resp.data, "question action");
          dispatch({
            type: QUESTION_INFO,
            payload: resp.data,
          });
        })
        .catch((error) => alert(error))
    : alert("errore");
};
