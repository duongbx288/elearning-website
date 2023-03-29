import {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Divider, InputBase, Menu, MenuItem, MenuProps, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import CourseService, { CourseRequest, CourseCriteria } from '../../../../../services/CourseService';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  height: '45px',
  width: '40vw', // Change width here
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    minWidth: '40vw', // and here
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    border: '1px solid black',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontSize: '20px',
    width: '35vw',
    [theme.breakpoints.up('md')]: {
      width: '35vw',
    },
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={2}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const SearchBar = () => {

  const navigate = useNavigate();
  // criteria
  const [courses, setCourses] = useState<CourseRequest[]>([]);
  const [criteria, setCriteria] = useState<CourseCriteria>({});
  const [name, setName] = useState<string | null>();

  // For menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    CourseService.findCourses(criteria).then((res) => {
      if (res.data) {
        setCourses(res.data.content);
      }
    });
  }, [criteria]);

  useEffect(() => {
    const criteria1 = {
      limit: 5,
      page: 0,
      name: name,
    } as CourseCriteria;
    setCriteria(criteria1);
  }, [name]);

  const handleChange = (e: any) => {
    setName(e.target.value);
  }

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" 
        aria-controls={(name && name.length > 0) ? 'demo-customized-menu' : undefined} 
        aria-haspopup="true"
        aria-expanded={(name && name.length > 0) ? 'true' : undefined} 
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        />
      </Search>
      {/* <StyledMenu
        id="demo-customized-menu"
        disableEnforceFocus
        disableRestoreFocus
        disableAutoFocus
        disableAutoFocusItem
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={(name && name.length > 0) ? true : false}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        {courses.map((item) => {
          return (
            <MenuItem key={item.id} onClick={() => navigate(`/course-info/`+item.id)} disableRipple>
              <Typography variant="inherit" noWrap key={item.id}>
                {item.name}
              </Typography>
              <Divider sx={{ my: 0.5 }} />
            </MenuItem>
          );
        })}
      </StyledMenu> */}
    </>
  );
};

export default SearchBar;
