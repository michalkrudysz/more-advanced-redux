import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; // pobieram nowy produkt z akcji
      const existingItem = state.items.find((item) => item.id === newItem.id); // sprawdzam czy item istnieje w koszyku
      state.totalQuantity++;
      if (!existingItem) {
        // Dodaję nowy produkt do tablicy items w stanie
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price, // Początkowa cena całkowita to cena jednostkowa
          title: newItem.title, // Dodanie tytułu produktu do obiektu w stanie
        });
      } else {
        // Zwiększam ilość i całkowitą cenę istniejącego produktu
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // Usuwam produkt z tablicy, jeśli ilość to 1
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        // Zmniejszam ilość i całkowitą cenę produktu
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions; // exportuję akcje z cartSlice dla komponentów
export default cartSlice;
