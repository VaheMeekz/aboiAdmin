import { DELEVERY_DATA } from "../types";

const initialState = {
  delevery: null,
};

export const deleveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELEVERY_DATA:
      return { ...state, delevery: action.payload };

    default:
      return state;
  }
};
