import { createSlice } from "@reduxjs/toolkit"; // pobieram z redux toolkit funkcję createSlice
import { uiActions } from "./ui-slice"; // importuję akcje z ui-slice

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

// Krok 1: Definicja funkcji sendCartData, która przyjmuje dane koszyka jako argument.
export const sendCartData = (cartData) => {
  // "Thunk" to termin używany w programowaniu do opisania funkcji, która zwraca funkcję. Te funkcje są używane do opóźniania obliczeń do momentu, gdy są one naprawdę potrzebne. W kontekście Redux, thunki są często używane do obsługi akcji asynchronicznych - zamiast natychmiast zwracać akcję, thunk zwraca funkcję, która może być wywołana później, kiedy operacja asynchroniczna (tak jak pobieranie danych z serwera) zostanie zakończona.
  // Krok 2: Funkcja zwraca asynchroniczną funkcję thunk, która przyjmuje funkcję dispatch.
  return async (dispatch) => {
    // Krok 3: Wywołanie akcji dispatch z akcją pokazującą powiadomienie o statusie "w trakcie".
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // Krok 4: Definicja asynchronicznej funkcji sendRequest do wysyłania danych.
    const sendRequest = async () => {
      // Krok 5: Wywołanie funkcji fetch z metodą PUT, aby wysłać dane do bazy danych Firebase.
      const response = await fetch(
        "https://learning-redux-b386b-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      // Krok 6: Sprawdzenie, czy odpowiedź od serwera jest poprawna.
      if (!response.ok) {
        // Krok 7: Jeśli odpowiedź nie jest poprawna, rzucenie wyjątku.
        throw new Error("Sending cart data failed.");
      }
    };

    // Krok 8: Obsługa próby wysłania danych i złapanie ewentualnych błędów.
    try {
      // Krok 9: Wywołanie funkcji sendRequest i oczekiwanie na jej zakończenie.
      await sendRequest();
      // Krok 10: Wywołanie akcji dispatch z akcją pokazującą powiadomienie o sukcesie.
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // Krok 11: W przypadku błędu, wywołanie akcji dispatch z akcją pokazującą powiadomienie o błędzie.
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions; // exportuję akcje z cartSlice dla komponentów
export default cartSlice;
