import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
addToCart: (state, action) => {
  const item = action.payload;

  const existing = state.items.find((i) => {
    if (item.type === "hotel") {
      return (
        i.id === item.id &&
        i.type === item.type &&
        i.checkIn === item.checkIn
      );
    }

    return (
      i.id === item.id &&
      i.type === item.type &&
      i.date === item.date
    );
  });

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    state.items.push({ ...item, quantity: item.quantity || 1 });
  }
},

    // ✅ INCREASE
    increaseQuantity: (state, action) => {
      const item = state.items[action.payload];
      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ DECREASE
    decreaseQuantity: (state, action) => {
      const item = state.items[action.payload];
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (_, index) => index !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;