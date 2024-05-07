import { configureStore } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję configureStore

import uiSlice from "./ui-slice"; // importuję slice uiSlice
import cartSlice from "./cart-slice"; // importuję slice cartSlice

// konfiguruję store
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer }, // przekazuję reducer uiSlice
});

export default store; // eksportuję store
