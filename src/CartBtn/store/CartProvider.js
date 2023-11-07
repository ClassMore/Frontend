import React, {useState, useEffect} from "react";
import CartContext from "./cart-context";
import axios from 'axios';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const url = process.env.REACT_APP_DEFAULT_URL;

const CartProvider = (props) => {
    const [cartState, setCartState] = useState(defaultCartState);

    const removeItemFromCartHandler = async (item) => {
        try {
            const response = await axios
                .delete(`${url}user/cart/${item}`,
                    {
                        headers:
                            {Authorization: `${localStorage.getItem('token')}`}
                    });


            setCartState((prevCartState) => {
                const existingCartItemIndex = prevCartState.items.findIndex((cartItem) => {
                    return cartItem.lectureId === item;
                });

                if (existingCartItemIndex === -1) {
                    return prevCartState; // Item not found, no changes needed
                }

                const existingItem = prevCartState.items[existingCartItemIndex];

                const updatedItems = [...prevCartState.items];

                updatedItems.splice(existingCartItemIndex, 1); // Remove the item from the copy of the array

                return {
                    items: updatedItems,
                    totalAmount: prevCartState.totalAmount - existingItem.price
                };
            });
        } catch (error) {
            console.error(error);
        }
    };
    const calculateTotalAmount = (items) => {
        let totalAmount = 0;
        for (const item of items) {
            const price = parseInt(item.price);
            totalAmount += price;

        }

        return totalAmount;
    };

    const fetchBasketData = async () => {
        try {
            const response = await axios
                .get(`${url}user/basketList`,
                    {headers: {Authorization: `${localStorage.getItem('token')}`}}
                );
            const basketData = response.data
            const totalAmount = calculateTotalAmount(basketData);

            setCartState({
                items: basketData,
                totalAmount: calculateTotalAmount(basketData),
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBasketData();
    }, []);

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        refreshItems: fetchBasketData,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;