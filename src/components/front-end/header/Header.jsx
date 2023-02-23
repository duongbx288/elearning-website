import React from 'react';
import './Header.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SearchBar from './components/components/SearchBar';

const Header = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
      {/* <Search /> */}
      <Navbar />
    </>
  );
};

export default Header;
