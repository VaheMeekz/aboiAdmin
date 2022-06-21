import { USER_ORDER } from "../types";

const initialState = {
  userorderdata: [],
};

export const UserOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ORDER:
      return { ...state, userorderdata: action.payload };

    default:
      return state;
  }
};
