import React from 'react';
import logo from '../../components/front-end/assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    if (search !== null)
    search.classList.toggle('active', window.scrollY > 100);
  });

  const userInfo =
    typeof localStorage.getItem('user') !== 'undefined'
      ? (localStorage.getItem('user') || '')
      : '';

  console.log(userInfo);

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <img src={logo} alt="" />
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>All Category</span>
          </div>

          { userInfo !== '' ?
            <div className="icon f_flex width">
              <i className="fa fa-user icon-circle"></i>
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-bag icon-circle"></i>
                  <span>{CartItem.length === 0 ? '' : CartItem.length}</span>
                </Link>
              </div>
            </div>
            : <div>
              <Button> Dang nhap </Button>
              <Button> Dang nhap </Button>
              <Button> Dang nhap </Button>
            </div>
          }
        </div>
      </section>
    </>
  );
};

export default Search;
