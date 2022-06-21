import { BANNER_HOME } from "../types";

const initialState = {
  bannerData: null,
};

export const BannerinfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_HOME:
      return {
        ...state,
        bannerData:
          action.payload.length > 0 ? action.payload : ["Data is Empty"],
      };

    default:
      return state;
  }
};
