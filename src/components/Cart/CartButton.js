import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice"; // importuję akcje z ui-slice
import { useDispatch, useSelector } from "react-redux"; // importuję useDispatch z react-redux

const CartButton = (props) => {
  const dispatch = useDispatch(); // pobieram dispatch
  const cartQuantity = useSelector((state) => state.cart.totalQuantity); // useSelector pozwala na pobranie stanu z store (w tym przypadku totalQuantity)
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle()); // wywołuję akcję toggle
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>Mój koszyk</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
