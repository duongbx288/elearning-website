import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../context/CartContext';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import OrderService, { OrderRequest, OrderItemRequest } from '../../../services/OrderService';
import { handleDiscount, handleCoursePrice, totalPrice, initSum, sumAllDiscount } from './CalculatePrice';
import Cookies from 'js-cookie';
// import UserService, { UserInfo } from '../../../../services/UserService';
const Cart = () => {
  // Kiem tra xem khach hang da dang nhap chua
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });
  const [userInfo, setUserInfo] = useState<any>({});

  // Gio hang
  const cartContext = useContext(CartContext).cartInfo;
  const cart = cartContext.cart ? cartContext.cart : [];
  const removeItem = cartContext.removeItem;
  const [cartData, setCartData] = useState(cart);

  // number format
  var nf = new Intl.NumberFormat();

  // Dialog
  const [open, setOpen] = useState<boolean>(false);

  // Snackbar
  const [success, setSuccess] = useState<boolean>(false);
  const [noItem, setNoItem] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [affCookie, setAffCookie] = useState<any>();
  const vertical = 'top';
  const horizontal = 'center';

  useEffect(() => {
    document.title = 'Giỏ hàng';
    window.scrollTo(0, 0);
    let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
    if (Cookies.get('affId')) {
      const aff = Cookies.get('affId');
      setAffCookie(JSON.parse(aff));
    }
  }, []);

  console.log(affCookie);
  
  useEffect(() => {
    if (typeof cartContext.cart !== 'undefined' && cartContext.cart.length > 0) {
      setCartData(cartContext.cart);
    }
  }, [cartContext.cart, cartData]);

  const remove = (itemC: any) => {
    const exist = cartData.find((item) => item.courseId === itemC.courseId);
    if (exist)
      setCartData(cartData.filter((product) => product.courseId !== itemC.courseId));
  };

  // Thanh toan
  const handlePurchase = () => {
    var itemList = [] as OrderItemRequest[];
    cartData.forEach((item) => {
      const orderItemRequest = {
        courseId: item.id,
        initPrice: item.price,
        discount: handleDiscount(item),
        price: handleCoursePrice(item),
        couponCode: item.couponCode,
        affiliateId: item.affiliateId ? item.affiliateId : affCookie?.affiliateId,
      } as OrderItemRequest;
      itemList.push(orderItemRequest);
    });
    const orderResquest = {
      userId: userInfo?.id,
      studentId: userInfo?.studentId,
      initialSum: initSum(cartData),
      discount: sumAllDiscount(cartData),
      total: totalPrice(cartData),
      orderItems: itemList,
    } as OrderRequest;
    OrderService.createNewOrder(orderResquest).then((res) => {
      if(res.data === "Successful") {
        handleClose();
        setSuccess(true);
        setCartData([]);
        cartContext.removeAll();
      } else {
        console.log(res.data);
        setError(true);
      }
    })
  };

  // Dialog
  const handleOpen = () => {
    if (cartData.length === 0) {
      setNoItem(true);
      return;
    }
    if (account && account.username?.length > 0) {
      setOpen(true);
    } else {
      navigate('/sign-in');
    }
  };
  const handleClose = () => setOpen(false);

  // Snackbar

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
                    <Box
                      display={'flex'}
                      sx={{ border: '1px solid', marginBottom: 1, padding: 1 }}
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box margin={2} display={'flex'}>
                        <Box
                          component={'img'}
                          width="200px"
                          height="100px"
                          src={item.cover}
                          alt=""
                        ></Box>
                        <Box marginLeft={2}>
                          <Typography variant="h6">Khóa học: {item.name}</Typography>
                          <Box display="flex">
                            <Typography>
                              {nf.format(handleCoursePrice(item))} đ
                            </Typography>
                            {item.couponCode && item.price !== 0 ? (
                              <Typography sx={{ textDecoration: 'line-through' }}>
                                {nf.format(item.price)}
                              </Typography>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            remove(item);
                            removeItem(item);
                          }}
                        >
                          x
                        </Button>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} marginLeft={1}>
          <Box>
            <h2>Thành tiền</h2>
            <Box>
              {cartData.map((item) => {
                return (
                  <Box display="flex" justifyContent={'space-between'}>
                    <Typography noWrap sx={{ margin: 0.5 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ margin: 0.5 }}>
                      {nf.format(handleCoursePrice(item)) + 'đ'}
                    </Typography>
                  </Box>
                );
              })}
              <Divider />
              <Box display="flex" justifyContent={'space-between'}>
                <Typography sx={{ marginBottom: 1, marginTop: 0.5 }}>
                Tổng tiền
                </Typography>
                <Typography sx={{ marginBottom: 1, marginTop: 2, fontSize: '20px' }}>
                  {nf.format(totalPrice(cartData))}đ
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleOpen}
                sx={{ marginBottom: 2 }}
              >
                Thanh toán
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle width={'500px'}>Thanh toán</DialogTitle>
        <DialogContentText marginLeft={1} paddingLeft={2}>
          <Typography sx={{ color: '#000000', fontSize: '20px' }}>
            Thông tin thanh toán
          </Typography>
        </DialogContentText>
        <DialogContent>
          <Box display={'flex'} justifyContent={'space-between'}>
            <TextField
              value={account.username}
              label="username"
              variant="standard"
              aria-readonly
              sx={{ marginBottom: 2 }}
            ></TextField>
              <TextField
              value={totalPrice(cartData)}
              label="Thành tiền"
              variant="standard"
              aria-readonly
              sx={{ marginBottom: 2}}
            ></TextField>
          </Box>
          <Divider></Divider>
          <Typography sx={{ color: '#000000', fontSize: '20px' }}>
            Khóa học được mua
          </Typography>
          {cartData.map((item) => {
            return (
              <Box display="flex" justifyContent={'space-between'}>
                <Typography noWrap sx={{ margin: 0.5 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ margin: 0.5 }}>
                  {nf.format(handleCoursePrice(item)) + 'đ'}
                </Typography>
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={handlePurchase}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        sx={{ width: '600px' }}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setSuccess(false)}
          sx={{ width: '600px' }}
        >
          Thanh toán thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={noItem}
        sx={{ width: '600px' }}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={() => setNoItem(false)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setNoItem(false)}
          sx={{ width: '600px' }}
        >
          Không có khóa học nào trong giỏ hàng
        </Alert>
      </Snackbar>
        <Snackbar
        open={error}
        sx={{ width: '600px' }}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert
          variant="filled"
          severity="warning"
          onClose={() => setError(false)}
          sx={{ width: '600px' }}
        >
          Thanh toán không thành công
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
