import React, { useContext, useState } from 'react';

export const CartContext = React.createContext<any>(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState<any>([]);

    const test = 10;
    // value duoc dung de truyen di thong tin
    const value ={cart: cart, setCart: setCart, test: test};

    return (
        <CartContext.Provider value={{cart, setCart, test}}>
            {children}
        </CartContext.Provider>  
    )
}

export const CartDisplay = () => {
    const [cartTool] = useContext(CartContext);
    return <>{cartTool.cart}</>
} 