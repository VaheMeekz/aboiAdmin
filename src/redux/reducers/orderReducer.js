import { ORDER_INFO, SEARCHED_DATA } from "../types";

const initialState = {
  orderata: null,
};

export const orderDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_INFO:
      return { ...state, orderata: action.payload };
    case SEARCHED_DATA:
      console.log(action.payload, "search reducers");
      return { ...state, orderata: action.payload };
    default:
      return state;
  }
};
