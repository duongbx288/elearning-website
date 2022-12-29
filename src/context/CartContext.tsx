import React, { useContext, useState } from 'react';

export const CartContext = React.createContext<any>(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState<any>([]);

    const setInfo = (info : any) => {
        setCart(info);
    }

    // Kiem tra xem khoa hoc da co trong gio hang hay khong
    const checkExistItem = (product: any) => {
        const existProduct = cart.find((item) => item.id === product.id);
        if (existProduct) return false;
        else return true;
    }

    // Them khoa hoc vao gio hang
    const addToCart = (product: any) => {
        setCart([...cart, { ...product}]);
    }

    console.log(cart);

    const test = 10;
    // value duoc dung de truyen di thong tin
    const cartInfo ={cart, setInfo, test};

    return (
        <CartContext.Provider value={{cartInfo}}>
            {children}
        </CartContext.Provider>  
    )
}
