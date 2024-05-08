import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible); // useSelector pozwala na pobranie stanu z store (w tym przypadku cartIsVisible)
  const cart = useSelector((state) => state.cart); // useSelector pozwala na pobranie stanu z store (w tym przypadku cart)

  useEffect(() => {
    fetch(
      "https://learning-redux-b386b-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
