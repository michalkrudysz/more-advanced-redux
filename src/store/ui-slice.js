import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice

const uiSlice = createSlice({
  name: "ui", // nazwa slice
  initialState: { cartIsVisible: false }, // stan początkowy
  // mapa metod dla funkcji reducera
  reducers: {
    // metoda toogle przyjmuje stan i zmienia wartość cartIsVisible na przeciwną
    // warto podkreślić, że dzięki reduxtool, mogę tak zmienić stan na przeciwny, bez konieczności przekazywania całego stanu
    toogle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions; // pobieram akcje z uiSlice
export default uiSlice;
