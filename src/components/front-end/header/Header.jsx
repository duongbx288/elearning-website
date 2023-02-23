import React from 'react';
// import './Header.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SearchBar from './components/components/SearchBar';
import LoginMenu from './components/LoginMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky"
      >
        <Toolbar
          sx={{margin: 1}}
        >
          
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, cursor: "pointer" }}
            onClick={() => navigate('/main')}
          >
            MUI
          </Typography>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <LoginMenu/>
        </Toolbar>
      </AppBar>
      {/* <Search /> */}
      {/* <Navbar /> */}
    </>
  );
};

export default Header;
