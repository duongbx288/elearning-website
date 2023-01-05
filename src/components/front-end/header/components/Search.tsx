import React, { useEffect, useState, useContext } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu } from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { logout } from '../../../../auth/authenticationSlice';
import { CartContext } from '../../../../context/CartContext';
import UserService from '../../../../services/UserService';

const Search = () => {
  const cartContext = useContext(CartContext).cartInfo;
  const cartItem = cartContext.cart ? cartContext.cart : [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });

  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState();

  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setUsername(account.username);
    if (account.username != null && typeof account.username != 'undefined') {
      UserService.getUserInfoByUsername(account.username).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [account]);

  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    if (search !== null) search.classList.toggle('active', window.scrollY > 100);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInfo = () => {
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    localStorage.removeItem('user');
    setUsername('');
  };

  const handleSignIn = () => {
    handleClose();
  };

  const handleGoToLearn = () => {
    handleClose();
  };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to={'/main'}>
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>All Category</span>
          </div>

          {typeof username !== 'undefined' && username.length > 0 ? (
            <div className="icon f_flex width">
              <i
                className="fa fa-user icon-circle"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={
                  open ? { cursor: 'pointer', color: '#ff014f' } : { cursor: 'pointer' }
                }
              ></i>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{ width: '250px', textOverflow: 'ellipsis' }}
              >
                <MenuItem disabled>Tên tài khoản: {username}</MenuItem>
                <MenuItem onClick={handleInfo}>Thông tin</MenuItem>
                <MenuItem onClick={handleGoToLearn}>Vào học</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  {cartItem.length === 0 ? <></> : <span>{cartItem.length}</span>}
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyItems: 'center',
                width: '20%',
              }}
            >
              <Link to="/sign-in">Đăng nhập</Link>
              <Link to="/sign-in">Đăng ký</Link>
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  {cartItem.length === 0 ? <></> : <span>{cartItem.length}</span>}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;