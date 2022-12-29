import React, { useEffect, useState, useContext } from 'react';
import logo from '../assets/images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu } from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../auth/authenticationSlice';
import { CartContext } from '../../../context/CartContext';

const Search = () => {
  const cartContext = useContext(CartContext);
  const cartItem = cartContext.cart ? cartContext.cart : [];
  const history = useHistory();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);

  const [username, setUsername] = useState({ username: account.username });
  const [userInfo, setUserInfo] = useState<any>(localStorage.getItem('user'));


  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // if (typeof account.username !== 'undefined') {
    //   localStorage.setItem('user', JSON.stringify(username));
    //   setUserInfo(true);
    // } else {
    // }
  }, []);

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
    setUserInfo(false);
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

          {userInfo !== false ? (
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
                <MenuItem disabled>Tên tài khoản: {username.username}</MenuItem>
                <MenuItem onClick={handleInfo}>Thông tin</MenuItem>
                <MenuItem onClick={handleGoToLearn}>Vào học</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  <span>{cartItem.length === 0 ? '' : cartItem.length}</span>
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
                  <span>{cartItem.length === 0 ? '' : cartItem.length}</span>
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
