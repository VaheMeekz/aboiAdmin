import { GETALL_CATEGORYS } from "../types";

const initialState = {
  allCategory: [],
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_CATEGORYS:
      return { ...state, allCategory: action.payload };

    default:
      return state;
  }
};
