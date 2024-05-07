import { configureStore } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję configureStore

import uiSlice from "./ui-slice"; // importuję slice uiSlice

// konfiguruję store
const store = configureStore({
  reducer: { ui: uiSlice.reducer }, // przekazuję reducer uiSlice
});

export default store; // eksportuję store
