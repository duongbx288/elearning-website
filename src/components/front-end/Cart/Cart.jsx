import React, { useContext, useState, useEffect } from 'react';
import './style.css';
import { CartContext } from '../../../context/CartContext';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from '../../../store/hooks';
import UserService, { UserInfo } from '../../../../services/UserService';

const Cart = () => {

  // Gio hang
  const cartContext = useContext(CartContext).cartInfo;
  const cart = cartContext.cart? cartContext.cart : [];
  const removeItem = cartContext.removeItem;
  const [cartData, setCartData] = useState(cart);

  const [username, setUsername] = useState('');
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });


  useEffect(() => {
    document.title='Giỏ hàng';
    
  }, []);

  useEffect(() => {
    if (typeof cartContext.cart !== 'undefined' && cartContext.cart.length > 0) {
      setCartData(cartContext.cart);
      console.log(cartContext.cart);
    }
  }, [cartData]);

  const totalPrice = cartData.reduce((price, item) => price +  item.price, 0);

  const remove = (item: any) => {
    const exist = cartData.find((item) => item.id === item.id);
    if (exist) setCartData(cartData.filter((product) => product.id !== item.id)); 
  };

  const handlePurchase = () => {
    return;
  }

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartData.length === 0 && (
              <h1 className="no-items product">Không có khóa học nào trong giỏ hàng</h1>
            )}

            {cartData.map((item) => {
              const productQty = item.price;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img" style={{ margin: '5px'}}>
                    <img src={item.cover} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>Khóa học: {item.name}</h3>
                    <h4>
                      Gía tiền: {item.price}đ
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart" onClick={() => {
                        remove(item);
                        removeItem(item)
                      }}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className="cartControl d_flex">
                      <button className="desCart" onClick={() => {
                        remove(item);
                        removeItem(item)}}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product" style={{minHeight: '150px'}}>
            <h2>Tổng tiền</h2>
            <Box>
              <Typography sx={{ marginBottom: 1}}>{totalPrice}đ</Typography>
              <Button fullWidth variant='outlined'
                onClick={handlePurchase}
              >Thanh toán</Button>
            </Box>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
