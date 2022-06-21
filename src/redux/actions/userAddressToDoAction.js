import { USER_ADDRESS_INFO, USER_ADDRESS_ID } from "../types";

export const getAddressToDo = (todoarr) => {
  console.log(todoarr, "action12");
  return (dispatch) => {
    dispatch({
      type: USER_ADDRESS_INFO,
      payload: {
        data: todoarr,
      },
    });
  };
};

export const getAddressToDoId = (id) => {
  return (dispatch) => {
    dispatch({
      type: USER_ADDRESS_ID,
      payload: {
        id: id,
      },
    });
  };
};
