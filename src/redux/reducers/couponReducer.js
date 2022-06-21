import { COUPON_DATA } from "../types";

const initialState = {
  couponData: null,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUPON_DATA:
      return { ...state, couponData: action.payload };

    default:
      return state;
  }
};
