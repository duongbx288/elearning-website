import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import SearchBar from './components/SearchBar/SearchBar';
import HtmlTooltip from '../../../utility/CustomTooltip';
import CourseService, { CourseCriteria, CourseRequest } from '../../../services/CourseService';

const CourseList = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext).cartInfo;

  const [courseList, setCourseList] = useState<any>([]);
  // dialog
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [typeId, setTypeId] = useState<number[]| null>();
  const [name, setName] = useState<string | null>();
  const [rating, setRating] = useState<number | null>();
  const [maxPrice, setMaxPrice] = useState<number | null>();
  const [minPrice, setMinPrice] = useState<number | null>();

  const [courses, setCourses] = useState<CourseRequest[]>([]);

  useEffect(() => {
    var s = [1,2]
    const criteria = {
      limit: limit,
      page: page,
      typeId: s.join(",") // change array to string for API
    } as CourseCriteria;
    CourseService.findCourses(criteria).then((res) => {
      if (res.data) {
        console.log(res.data);
      }
    })
  },[limit, page]);

  // Cart
  const addToCart = (item) => {
    cartContext.addToCart(item);
    return;
  };

  const removeItem = (item) => {
    cartContext.removeItem(item);
    // setSelected();
    return;
  };

  // Dialog
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        <Box></Box>
        <Typography></Typography>
        <Button></Button>
        <SearchBar/>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default CourseList;
