import { SET_MODE, SET_COLOR } from "../types";

const initialState = {
  mode: "",
  color: "",
};

export const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
