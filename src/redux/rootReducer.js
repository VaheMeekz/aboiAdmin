import { combineReducers } from "redux";
import { questionReducer } from "./reducers/questionReducer";
import { AddressToDoReducer } from "./reducers/userAddressToDo.Reducer";
import { AboutReducer } from "./reducers/aboutReducer";
import { ContactReducer } from "./reducers/contacReducer";
import { UserOrderReducer } from "./reducers/userOrderReducer";
import { ThemeReducer } from "./reducers/ThemeReducer";
import { CategoryReducer } from "./reducers/categoryReducer";
import { ProductReducer } from "./reducers/productReducer";
import { BannerinfoReducer } from "./reducers/bannerReducer";
import { userReducerData } from "./reducers/userreducer";
import { couponReducer } from "./reducers/couponReducer";
import { giftCardReducerName } from "./reducers/giftCardReducer";
import { blackListReducer } from "./reducers/blackListReducer";
import { SpecialOfferReducer } from "./reducers/specialOfferReducer";
import { deleveryReducer } from "./reducers/deleveryReducer";
import { orderDataReducer } from "./reducers/orderReducer";
import { statisticReducer } from "./reducers/statisticaReducer";
import { CategorySelectReducer } from "./reducers/categorySelectReducer";
export const rootReducer = combineReducers({
  questionReducer,
  AddressToDoReducer,
  AboutReducer,
  ContactReducer,
  UserOrderReducer,
  ThemeReducer,
  CategoryReducer,
  ProductReducer,
  BannerinfoReducer,
  userReducerData,
  couponReducer,
  giftCardReducerName,
  blackListReducer,
  SpecialOfferReducer,
  deleveryReducer,
  orderDataReducer,
  statisticReducer,
  CategorySelectReducer,
});
