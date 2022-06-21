import { USER_ADDRESS_INFO, USER_ADDRESS_ID } from "../types";

const initialState = {
  AddresToDo: [],
};

export const AddressToDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDRESS_INFO:
      let y = [...state.AddresToDo, action.payload.data];
      return { ...state, AddresToDo: y };
    case USER_ADDRESS_ID:
      let x = state.AddresToDo.filter((i) => {
        return i.id !== action.payload.id;
      });
      return { ...state, AddresToDo: x };

    default:
      return state;
  }
};
