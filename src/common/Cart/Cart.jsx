import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { CartContext } from '../../context/CartContext';

const Cart = ({ CartItem, addToCart, decreaseQty }) => {

  const cartContext = useContext(CartContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (cartContext.cart.length > 0) {
      setCartData(100);
      console.log(cartContext.cart);
    }

  }, []);
  // Stpe: 7 - calucate total of items
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

  return (
    <>
      <Header CartItem={CartItem} />
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className="cartControl d_flex">
                      <button className="incCart" onClick={() => addToCart(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button className="desCart" onClick={() => decreaseQty(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
