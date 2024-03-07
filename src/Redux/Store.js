import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlice";
import { productsReducer } from "./ProductsSlice";
import cartReducer from "./cartSlice";

let store = configureStore({
  reducer: {
    counterReducer: CounterReducer,
    productsReducer: productsReducer,
    cart: cartReducer,
  },
});

export default store;
