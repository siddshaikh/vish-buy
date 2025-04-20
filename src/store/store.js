import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import cartReducer from "./features/cartSlice";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load cart state", err);
    return undefined;
  }
};

const preloadedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartReducer,
  },
  preloadedState: {
    cart: preloadedCartState,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const cartState = state.cart;
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch (err) {
    console.error("Could not save cart state", err);
  }
});
