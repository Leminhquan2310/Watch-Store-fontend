import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import wishlistReducer from "./reducers/wishlistReducer";
import { cartReducer } from "./reducers/cartReducer";

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
