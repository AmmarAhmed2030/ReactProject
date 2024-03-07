import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        console.log("if found", state.cartItems[itemIndex]);
        state.cartItems[itemIndex].stock -= 1;
        toast.info(
          `increased ${state.cartItems[itemIndex].productName} quantity`,
          {
            position: "bottom-left",
          }
        );
        console.log(state.cartItems[itemIndex]);
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        console.log("if not found", tempProduct);
        tempProduct.stock -= 1;
        toast.success(`${action.payload.productName} added to cart`, {
          position: "bottom-left",
        });
        console.log(tempProduct);
        state.cartItems.push(tempProduct);
      }

      // console.log(state.cartItems[0]);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.productName} removed from  cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.productName} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;

        toast.error(`${action.payload.productName} removed from  cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { finalPrice, cartQuantity } = cartItem;
          const itemTotal = finalPrice * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalPrice = total;
    },
  },
});
export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
