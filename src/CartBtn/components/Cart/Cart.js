import React, {useContext, useEffect} from "react";
import Modal from "../../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartProvider from "../../store/CartProvider"
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₩ ${cartCtx.totalAmount.toLocaleString()}`;
  // const totalAmount = `₩ ${cartPvd.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

    useEffect(() => {
        cartCtx.refreshItems();
    }, []);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, idx) => (
        <CartItem
          key={item.id}
          name={item.lectureTitle}
          id={item.lectureId}
          price={item.price}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose} >
      {cartItems}
      <div className={classes.total}>
        <span 	style={{
            color: "black"
        }}>Total Amount</span>
        <span style={{
            color: "black"
        }}>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
