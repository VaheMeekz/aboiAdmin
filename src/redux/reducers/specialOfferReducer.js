import { SPECIAL_OFFER } from "../types";

const initialState = {
  offer: null,
};

export const SpecialOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPECIAL_OFFER:
      return { ...state, offer: action.payload };

    default:
      return state;
  }
};
