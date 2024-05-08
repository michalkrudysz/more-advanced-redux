import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice

const uiSlice = createSlice({
  name: "ui", // nazwa slice
  initialState: { cartIsVisible: false, notification: null }, // stan początkowy
  // mapa metod dla funkcji reducera
  reducers: {
    // metoda toogle przyjmuje stan i zmienia wartość cartIsVisible na przeciwną
    // warto podkreślić, że dzięki reduxtool, mogę tak zmienić stan na przeciwny, bez konieczności przekazywania całego stanu
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions; // pobieram akcje z uiSlice
export default uiSlice;
