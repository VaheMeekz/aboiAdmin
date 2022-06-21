import { QUESTION_INFO } from "../types";

const initialState = {
  qestionInfo: {},
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_INFO:
      return { ...state, qestionInfo: action.payload };

    default:
      return state;
  }
};
