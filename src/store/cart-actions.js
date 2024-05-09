import { uiActions } from "./ui-slice"; // importuję akcje z ui-slice
import { cartActions } from "./cart-slice"; // importuję akcje z cart-slice

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://learning-redux-b386b-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Nie udało się pobrać danych koszyka!");
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
          title: "Błąd!",
          message: "Nie udało się pobrać danych koszyka!",
        })
      );
    }
  };
};

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Wysyłanie...",
        message: "Wysyłanie danych koszyka!",
      })
    );

    const sendRequest = async () => {
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

      if (!response.ok) {
        throw new Error("Wysyłanie danych koszyka nie powiodło się.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sukces!",
          message: "Dane koszyka zostały pomyślnie wysłane!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Błąd!",
          message: "Wysyłanie danych koszyka nie powiodło się!",
        })
      );
    }
  };
};
