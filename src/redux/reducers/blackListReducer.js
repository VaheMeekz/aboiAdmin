import { BLACK_LIST } from "../types";

const initialState = {
  black: null,
};

export const blackListReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLACK_LIST:
      return { ...state, black: action.payload };

    default:
      return state;
  }
};
