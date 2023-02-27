import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Toogle Menu
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="navlink">
            <ul
              className={'link f_flex capitalize'}
              style={{ marginBottom: 0, marginTop: '5px' }}
            >
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <Typography
                padding={'12px'}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#0d6efd',
                  },
                }}
                onClick={() => navigate('/main')}
              >
                Trang chủ
              </Typography>
              <Typography
                padding={'12px'}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#0d6efd',
                  },
                }}
                onClick={() => navigate('/course-list')}
              >
                Khóa học
              </Typography>
              <Typography
                padding={'12px'}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#0d6efd',
                  },
                }}
                onClick={() => navigate('/contact')}
              >
                Liên hệ
              </Typography>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
