import React from 'react';
// import './Header.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SearchBar from './components/components/SearchBar';
import LoginMenu from './components/components/LoginMenu';
import { useNavigate } from 'react-router-dom';
import Categories from './components/components/Categories';

const Header = () => {

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky" color="default"
      >
        <Toolbar
          sx={{margin: 1}}
        >
          <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, cursor: "pointer", marginRight: 3 }}
            onClick={() => navigate('/main')}
          >
            MUI
          </Typography>
          <Categories/>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <LoginMenu/>
        </Toolbar>
      </AppBar>
      <Navbar />
    </>
  );
};

export default Header;
