import { TOGGLE_WISHLIST } from "../Contains/wishlistContains";

export const toggle_wishlist = (product) => {
  return {
    type: TOGGLE_WISHLIST,
    payload: product,
  };
};
