import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice

const cartSlice = createSlice({
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
      state.totalQuantity++;
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
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id); // jeśli ilość jest jedena, zostawiamy wszystkie elementy w tablicy poza tym, którego mamy id za pomocą metody filter
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions; // exportuję akcje z cartSlice dla komponentów
export default cartSlice;
