import {
  PRODUCT_LIST,
  SIZE_FILTER,
  CART_ADD,
  CART_REMOVE,
  BACK_TO_HOME,
} from "../actions/types";
import ProductStub from "../../assets/StubJson";
const initialState = {
  user_cart: [],
  product_list: ProductStub,
  not_add_into_cart: ProductStub,
  total_cost: 0.0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        product_list: action.payload,
      };
    case CART_ADD:
      return {
        ...state,
        user_cart: action.payload[0],
        total_cost: action.payload[1],
      };
    case SIZE_FILTER:
      return {
        ...state,
        not_add_into_cart: action.payload,
      };
    case CART_REMOVE:
      return {
        ...state,
        cart_remove: action.payload,
      };
    case BACK_TO_HOME:
      return {
        ...state,
        product_list: state.not_add_into_cart,
      };

    default:
      return state;
  }
}
