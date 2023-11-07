import React, { useContext} from "react";
import CartContext from "../../store/cart-context";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
    const price = `₩ ${props.price.toLocaleString()}`;

    const cartCtx = useContext(CartContext);
    const cartItem = cartCtx.items.find((item) => item.id === props.id);
    console.log("Rendering CartItem for item ID:", props.id);
    const removeItemHandler = () => {
        cartCtx.removeItem(props.id);
    };

    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <span className={classes.price}>{price}</span>
                <button onClick={removeItemHandler}>X</button>
            </div>
        </li>
    );
};

export default CartItem;
