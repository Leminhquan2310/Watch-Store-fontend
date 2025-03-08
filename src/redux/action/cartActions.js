import {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_PRODUCT,
} from "../Contains/cartContains";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const changeQuantity = (id, quantity) => ({
  type: CHANGE_QUANTITY,
  payload: { id, quantity },
});
