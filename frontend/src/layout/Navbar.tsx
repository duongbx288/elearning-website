import React, { useEffect, useState, useLayoutEffect} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems } from '../components/backend/layout/listItems';
import Box from '@mui/material/Box';
import { logout } from '../auth/authenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';

const drawerWidth: number = 230;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  })
);

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const windowSize = window.innerWidth;

  const [username, setUsername] = useState({ username: account.username });
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAccountMenu = Boolean(anchorEl);

  useEffect(() => {
    if (typeof account.username !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(username));
    } else {
    }
  }, []);
  
  // useEffect(() => {
  //   if(windowSize <= 760){
  //     setOpen(false);
  //   } else setOpen(true);
  // }, [windowSize]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGoHome = () => {
    navigate('/');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const content = (
    <div>
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [0],
        }}
      >
        {open ? (
          <img
            id="logo"
            src={require('./Logo.png')}
            alt="logo"
            onClick={handleGoHome}
          />
        ) : null}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            ml: 1,
            marginRight: '0px',
            color: 'white',
            p: 0,
          }}
        >
          <MoreVertIcon sx={{ fontSize: '40px' }} />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" sx={{ pt: '0' }}>
        {mainListItems}
      </List>
      <Divider />
      <Box style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Cài đặt tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 0.5, mb: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
          <Typography variant={'body1'} color={'whitesmoke'}>
            {account.username?.toUpperCase()}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openAccountMenu}
          onClose={handleClose}
          onClick={handleClose}
          sx={{ width: '230px', pl: 0 }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              width: '100%',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                bottom: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem>
            <Avatar /> {account?.username?.toUpperCase()}
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Cài đặt
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ backgroundColor: 'black' }}
      PaperProps={{
        sx: {
          backgroundColor: '#202d3f',
          color: 'white',
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default Navbar;
