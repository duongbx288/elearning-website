import {
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../../../context/CartContext';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { logout } from '../../../../../auth/authenticationSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const LoginMenu = () => {
  const cartContext = useContext(CartContext).cartInfo;
  const cartItem = cartContext.cart ? cartContext.cart : [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });

  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    console.log(account);
    setUsername(account.username);
    let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, [account]);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    setUsername('');
    if (
      window.location.href.includes('student-course') ||
      window.location.href.includes('study-course')
    ) {
      navigate('/main');
    }
  };

  const handleGoToLearn = () => {
    handleClose();
    navigate('/student-page/' + userInfo?.studentId, {
      state: { id: userInfo?.studentId },
    });
  };

  const handleGoToAffiliate = () => {
    handleClose();
    navigate('/affiliate-page/' + userInfo?.affiliateId, {
      state: { id: userInfo?.affiliateId },
    })
  };

  const handleGoToTeacher = () => {
    handleClose();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem aria-readonly>Tên tài khoản: {username}</MenuItem>
      {/* {userInfo.studentId !== 0 ? (
        <MenuItem onClick={handleInfo}>Thông tin</MenuItem>
      ) : (
        <Box></Box>
      )} */}
      {userInfo.studentId !== 0 ? (
        <MenuItem onClick={handleGoToLearn}>Vào học</MenuItem>
      ) : (
        <Box></Box>
      )}
      {userInfo.affiliateId !== 0 ? (
        <MenuItem onClick={handleGoToAffiliate}>Affiliate</MenuItem>
      ) : (
        <Box></Box>
      )}
      {userInfo.teacherId !== 0 ? (
        <MenuItem onClick={handleGoToTeacher}>Giáo viên</MenuItem>
      ) : (
        <Box></Box>
      )}
      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
    </Menu>
  );

  const styles = {
    button: {
        width: 64, height: 64,
        padding: 0
    },
    icon: {
        fontSize:40,
        color:'#fffff'
    },
    tooltip: {
        marginLeft:7
    }
};

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {typeof username !== 'undefined' && username.length > 0 ? (
        <>
          <IconButton sx={{ margin: 0.5}} size="large" aria-label="" color="inherit">
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ margin: 1}}
          >
            <AccountCircle />
          </IconButton>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              navigate('/sign-in');
            }}
            sx={{ margin: 1}}
          >
            Đăng nhập
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              navigate('/sign-in');
            }}
            sx={{ margin: 1}}
          >
            Đăng ký
          </Button>
        </>
      )}
      <IconButton edge="end" size="large" onClick={() => navigate('/cart')} color="inherit">
        <Badge badgeContent={cartItem.length} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
      {renderMenu}
    </Box>
  );
};

export default LoginMenu;
