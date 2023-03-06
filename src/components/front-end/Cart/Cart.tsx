import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../context/CartContext';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { OrderRequest } from '../../../services/OrderService';
// import UserService, { UserInfo } from '../../../../services/UserService';
const Cart = () => {
  // Kiem tra xem khach hang da dang nhap chua
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => {
    return state.authentication.account;
  })


  // Gio hang
  const cartContext = useContext(CartContext).cartInfo;
  const cart = cartContext.cart ? cartContext.cart : [];
  const removeItem = cartContext.removeItem;
  const [cartData, setCartData] = useState(cart);

  var nf = new Intl.NumberFormat();

  const [username, setUsername] = useState('');
  // const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    document.title = 'Giỏ hàng';
  }, []);

  useEffect(() => {
    if (typeof cartContext.cart !== 'undefined' && cartContext.cart.length > 0) {
      setCartData(cartContext.cart);
    }
  }, [cartContext.cart, cartData]);


  const remove = (itemC: any) => {
    const exist = cartData.find((item) => item.courseId === itemC.courseId);
    if (exist) setCartData(cartData.filter((product) => product.courseId !== itemC.courseId));
  };

  const totalPrice = cartData.reduce((price, item) => price + item.price, 0);

  const handlePurchase = () => {
    if (account && account.username?.length > 0) {
      console.log(account);
      console.log('check something');
      const orderResquest = {
        userId: 0,
        initialSum: 0,
        discount: 0,
        total: 0,
        orderItems: [],
      } as OrderRequest;
    } else {
      navigate('/sign-in', );
    }
    return;
  };

  return (
    <>
      <Divider />
      <Typography variant="h4" sx={{ color: '#000000', marginLeft: 5, marginTop: 2 }}>
        Giỏ hàng
      </Typography>
      <Grid container>
        <Grid item xs={8} marginLeft={2} padding={2}>
          <Box sx={{ boxShadow: 2 }}>
            {cartData.length === 0 && (
              <h3 className="no-items product">Không có khóa học nào trong giỏ hàng</h3>
            )}
            <Box>
              {cartData.map((item) => {
                const productQty = item.initPrice;
                return (
                  <>
                    <Box display={'flex'} justifyContent="space-between" width="100%">
                      <Box margin={2} display={'flex'}>
                        <Box
                          component={'img'}
                          width="200px"
                          height="100px"
                          src={item.cover}
                          alt=""
                        ></Box>
                        <Box marginLeft={2}>
                          <Typography variant='h6'>Khóa học: {item.name}</Typography>
                          <Typography>{nf.format(item.price)} đ</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Button
                          onClick={() => {
                            remove(item);
                            removeItem(item);
                          }}
                        >
                          X
                        </Button>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <h2>Tổng tiền</h2>
            <Box>
              <Typography sx={{ marginBottom: 1, fontSize: '20px' }}>
                {totalPrice}đ
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={handlePurchase}
                sx={{ marginBottom: 2 }}
              >
                Thanh toán
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
