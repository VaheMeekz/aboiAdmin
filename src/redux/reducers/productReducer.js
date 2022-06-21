import { PRODUCT_DATA } from "../types";

const initialState = {
  allProduct: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DATA:
      return {
        ...state,
        allProduct: action.payload,
      };

    default:
      return state;
  }
};
