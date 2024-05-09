import { uiActions } from "./ui-slice"; // importuję akcje z ui-slice
import { cartActions } from "./cart-slice"; // importuję akcje z cart-slice

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://learning-redux-b386b-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data || { items: [], totalQuantity: 0 }; // Dodaj bezpieczne domyślne wartości
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [], // Bezpieczne domyślne wartości
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
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
