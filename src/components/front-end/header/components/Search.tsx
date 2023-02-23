import React, { useEffect, useState, useContext } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu } from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { logout } from '../../../../auth/authenticationSlice';
import { CartContext } from '../../../../context/CartContext';
import UserService, { UserInfo } from '../../../../services/UserService';

const Search = () => {
  const cartContext = useContext(CartContext).cartInfo;
  const cartItem = cartContext.cart ? cartContext.cart : [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => {
    return state.authentication.account;
  });

  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});

  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    console.log(account);
    setUsername(account.username);
    let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, [account]);

  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    if (search !== null) search.classList.toggle('active', window.scrollY > 120);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    navigate('/student-course/' + userInfo?.studentId, {
      state: { id: userInfo?.studentId },
    });
  };

  const handleInfo = () => {
    handleClose();
    navigate('/student-info/' + userInfo?.studentId, {
      state: { id: userInfo?.studentId },
    });
  };

  const handleGoToAffiliate = () => {
    handleClose();
  };

  const handleGoToTeacher = () => {
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
                <MenuItem aria-readonly>Tên tài khoản: {username}</MenuItem>
                {userInfo.studentId !== 0 ? <MenuItem onClick={handleInfo}>Thông tin</MenuItem>: <Box></Box>}
                {userInfo.studentId !== 0 ? <MenuItem onClick={handleGoToLearn}>Vào học</MenuItem>: <Box></Box>}
                {userInfo.affiliateId !== 0 ? <MenuItem onClick={handleGoToAffiliate}>Affiliate</MenuItem> : <Box></Box>}
                {userInfo.teacherId !== 0 ? <MenuItem onClick={handleGoToTeacher}>Giáo viên</MenuItem> : <Box></Box>}
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-cart icon-circle"></i>
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
                  <i className="fa fa-shopping-cart icon-circle"></i>
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
