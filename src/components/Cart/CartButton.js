import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-slice"; // importuję akcje z ui-slice
import { useDispatch } from "react-redux"; // importuję useDispatch z react-redux

const CartButton = (props) => {
  const dispatch = useDispatch(); // pobieram dispatch

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle()); // wywołuję akcję toggle
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
