import {
  PRODUCT_LIST,
  SIZE_FILTER,
  BACK_TO_HOME,
  CART_ADD,
  CART_REMOVE,
} from "./types";
import ProductStub from "../../assets/StubJson";

export const productList = (data) => (dispatch) => {
  dispatch({
    type: PRODUCT_LIST,

    payload: data,
    //value: ProductStub,
  });
};
export const addtoCart = (data) => (dispatch) => {
  dispatch({
    type: CART_ADD,
    payload: data,
  });
};
export const removefromcart = (data) => (dispatch) => {
  dispatch({
    type: CART_REMOVE,
    payload: data,
  });
};

export const fetchDashboardData = (data) => (dispatch) => {
  dispatch({
    type: SIZE_FILTER,
    payload: data,
  });
};

export const backToHome = () => (dispatch) => {
  dispatch({
    type: BACK_TO_HOME,
    payload: ProductStub,
  });
};
