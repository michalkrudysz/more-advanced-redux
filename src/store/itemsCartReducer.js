import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { quantity: 0, total: 0, price: 0 };

const itemsCartSlice = createSlice({
  name: "itemsCart",
  initialState: initialCartState,
  reducers: {
    addQuantity(state) {
      state.quantity++;
      state.total++;
    },
    removeQuantity(state) {
      state.quantity--;
      if (state.quantity < 0) {
        state.quantity = 0;
      }
      state.total--;
    },
  },
});

export const itemsCartSliceActions = itemsCartSlice.actions;
export default itemsCartSlice.reducer;
