import {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_PRODUCT,
} from "../Contains/cartContains";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  listCart: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { _id, name, price, discount, image_main } = action.payload;
      const isInCart = state.listCart.some((pro) => pro.id === _id);

      let updateListCart;
      if (isInCart) {
        updateListCart = state.listCart.map((item) => {
          return item.id === _id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice:
                  item.totalPrice + (price - (price / 100) * discount),
              }
            : item;
        });
      } else {
        updateListCart = [
          ...state.listCart,
          {
            id: _id,
            name,
            image: image_main.url,
            quantity: 1,
            price,
            discount,
            totalPrice: price - (price / 100) * discount,
          },
        ];
      }

      const cart = {
        listCart: updateListCart,
        totalQuantity: state.totalQuantity + 1,
        totalAmount: state.totalAmount + (price - (price / 100) * discount),
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case REMOVE_PRODUCT: {
      const productRemove = state.listCart.find(
        (item) => item.id === action.payload
      );
      const newListCart = state.listCart.filter(
        (item) => item.id !== productRemove.id
      );
      const cart = {
        listCart: newListCart,
        totalQuantity: state.totalQuantity - productRemove.quantity,
        totalAmount: state.totalAmount - productRemove.totalPrice,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }

    case CHANGE_QUANTITY: {
      const newListCart = state.listCart.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              quantity: action.payload.quantity,
              totalPrice:
                action.payload.quantity *
                (item.price - (item.price / 100) * item.discount),
            }
          : item;
      });

      const newTotalQuantity = newListCart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const newTotalAmount = newListCart.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      const cart = {
        listCart: newListCart,
        totalQuantity: newTotalQuantity,
        totalAmount: newTotalAmount,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    default:
      return state;
  }
};
