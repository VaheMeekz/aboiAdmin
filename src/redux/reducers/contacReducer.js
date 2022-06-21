import { CONTACT_INFO } from "../types";

const initialState = {
  contactInfo: [],
};

export const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_INFO:
      return { ...state, contactInfo: action.payload };

    default:
      return state;
  }
};
