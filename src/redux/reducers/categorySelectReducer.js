import { CATEGORY_SELECT } from "../types";

const initialState = {
  categorySelect: [],
};

export const CategorySelectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SELECT:
      return { ...state, categorySelect: action.payload };

    default:
      return state;
  }
};
