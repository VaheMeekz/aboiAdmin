import { GIFT_CARD } from "../types";

const initialState = {
  giftcardData: null,
};

export const giftCardReducerName = (state = initialState, action) => {
  switch (action.type) {
    case GIFT_CARD:
      return { ...state, giftcardData: action.payload };

    default:
      return state;
  }
};
