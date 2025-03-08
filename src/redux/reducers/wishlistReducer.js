import { TOGGLE_WISHLIST } from "../Contains/wishlistContains";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_WISHLIST: {
      const { _id, name, image_main, price, discount } = action.payload;
      const isExits = state.some((item) => item._id === _id);
      const newWishlist = isExits
        ? state.filter((item) => item._id !== _id)
        : [
            ...state,
            {
              _id,
              name,
              image: image_main.url,
              price,
              discount,
              netPrice: price - (price / 100) * discount,
            },
          ];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    }

    default:
      return state;
  }
};

export default wishlistReducer;
