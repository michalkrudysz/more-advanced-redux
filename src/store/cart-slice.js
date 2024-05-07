import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice

createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; // pobieram payload z akcji
      const existingItem = state.items.find((item) => item.id === newItem.id); // sprawdzam czy item istnieje w koszyku
      //jeśli ten produkt nie istnieje, to go dodaje do koszyka
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      }
      //jeżeli już ten produkt jest w koszyku, to zwiększam jego ilość i cenę
      else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart() {},
  },
});
