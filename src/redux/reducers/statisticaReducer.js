import { STATISTICA_DATA } from "../types";

const initialState = {
  statisticData: null,
  data: null,
};

export const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICA_DATA:
      console.log(action.payload, "3333333333");
      let obj = [
        {
          id: 1,
          icon: "fa-solid fa-bag-shopping",
          count: action.payload.coupon_use?.length,
          title: "coupon Use",
        },
        {
          id: 2,
          icon: "fa-solid fa-bag-shopping",
          count: action.payload.month_order,
          title: "Month Order",
        },
        {
          id: 3,
          icon: "fa-solid fa-bag-shopping",
          count: action.payload.users?.length,
          title: "Total Users",
        },
        {
          id: 4,
          icon: "fa-solid fa-bag-shopping",
          count: action.payload.total_price,
          title: "Total Price",
        },
        {
          id: 5,
          icon: "fa-solid fa-bag-shopping",
          count: action.payload.products?.length,
          title: "Products",
        },
      ];

      return {
        ...state,
        statisticData: action.payload,
        data: obj,
      };

    default:
      return state;
  }
};
