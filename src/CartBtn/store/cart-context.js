import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    refreshItems: () => {},
    removeItem: (item) => {},
    });

export default CartContext;