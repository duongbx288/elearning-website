import { Settings, Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ToolbarStyle } from '../styles/style';
import { logout } from '../auth/authenticationSlice';

const ToolbarAccount = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.authentication.account);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(logout());
    localStorage.removeItem('user');
    history.push('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar variant="dense" sx={ToolbarStyle}>
      <Typography>Quản lý</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
        <Box sx={{ display: 'flex' ,alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Cài đặt tài khoản">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
          <Typography variant={'body2'} ml={1}>
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
    </Toolbar>
  );
};

export default ToolbarAccount;
