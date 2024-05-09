import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { Fragment } from "react";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch(); // useDispatch pozwala na wywołanie akcji z store
  const showCart = useSelector((state) => state.ui.cartIsVisible); // useSelector pozwala na pobranie stanu z store (w tym przypadku cartIsVisible)
  const cart = useSelector((state) => state.cart); // useSelector pozwala na pobranie stanu z store (w tym przypadku cart)
  const notification = useSelector((state) => state.ui.notification); // useSelector pozwala na pobranie stanu z store (w tym przypadku notification)

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      // Sprawdzam czy koszyk został zmieniony i dopiero wtedy wysyłam dane
      dispatch(sendCartData(cart)); // Wysyłam dane z koszyka do bazy danych
    }
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
