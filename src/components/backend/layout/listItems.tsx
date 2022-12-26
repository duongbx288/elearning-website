import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import WebIcon from '@mui/icons-material/Web';
import ArticleIcon from '@mui/icons-material/Article';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import BarChartIcon from '@mui/icons-material/BarChart';
import { CropSquare } from '@mui/icons-material';
import { AccountCircle } from '@mui/icons-material';
import { Person } from '@mui/icons-material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const text = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  fontSize: '16px',
};
const itemStyle = {
  pl: 2,
  opacity: '0.7',
  '&:hover': {
    backgroundColor: '#2a3a51',
    color: 'whitesmoke',
    opacity: '1',
  },
};
const listIcon = {
  minWidth: '40px',
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/teacher" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <AccountCircle sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Danh sách giáo viên" sx={text} />
    </ListItemButton>
    <ListItemButton component={Link} to="/student" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <Person sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Danh sách học viên" sx={text} />
    </ListItemButton>
    <ListItemButton component={Link} to="/affiliate" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <RecordVoiceOverIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Danh sách affiliate" sx={text} />
    </ListItemButton>
    <ListItemButton component={Link} to="/order" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <ViewCarouselIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Danh sách đơn hàng" sx={text} />
    </ListItemButton>
    <ListItemButton component={Link} to="/course" sx={itemStyle}>
      <ListItemIcon sx={listIcon}>
        <ViewCarouselIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText disableTypography primary="Danh sách khóa học" sx={text} />
    </ListItemButton>
  </React.Fragment>
);
