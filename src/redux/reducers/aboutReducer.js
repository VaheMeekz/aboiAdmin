import { ABOUT_INFO } from "../types";

const initialState = {
  aboutdata: null,
};

export const AboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABOUT_INFO:
      return { ...state, aboutdata: action.payload };

    default:
      return state;
  }
};
