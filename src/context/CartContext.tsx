import React, { useContext, useState } from 'react';

export const CartContext = React.createContext<any>(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<any>([]);

  const setInfo = (info: any) => {
    setCart(info);
  };

  // Kiem tra xem khoa hoc da co trong gio hang hay khong
  const checkExistItem = (product: any) => {
    if (product) {
      const existProduct = cart.find((item) => item.id === product.id);
      if (existProduct) return true;
      else return false;
    } else return false;
  };

  // Them khoa hoc vao gio hang
  const addToCart = (product: any) => {
    if (checkExistItem(product)) {
    } else setCart([...cart, { ...product }]);
    return;
  };

  const removeItem = (product: any) => {
    if (checkExistItem(product)) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else return;
  };

  const removeAll = () => {
    setCart([]);
  };

  const test = 10;
  // value duoc dung de truyen di thong tin
  const cartInfo = {
    cart,
    setInfo,
    test,
    addToCart,
    checkExistItem,
    removeItem,
    removeAll,
  };

  return <CartContext.Provider value={{ cartInfo }}>{children}</CartContext.Provider>;
};
