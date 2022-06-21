import { USER_DATA } from "../types";

const initialState = {
  userData: null,
};

export const userReducerData = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
};
