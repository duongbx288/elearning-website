import React, { useContext, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tdata from './Tdata';
import { CartContext } from '../../../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import {
  Divider,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from '@mui/material';
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement={'auto'} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 240,
    width: 240,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const TopCart = ({ courses }) => {
  const cartContext = useContext(CartContext).cartInfo;
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  // dialog
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleCourse = (id) => () => {
    console.log(id);
    navigate('/course-info/' + id, { state: { id: id } });
  };

  var cardStyle = {
    display: 'block',
    height: '400px',
  };

  // Use 'course' or 'Tdata'

  return (
    <>
      <Slider {...settings}>
        {courses.map((course) => {
          return (
            <>
              <HtmlTooltip
                title={
                  <>
                    <Box padding={1}>
                      <Typography variant={'h6'}>Khóa học: {course.name}</Typography>
                      <br />
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '6',
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '1',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {course.introduction}
                      </Typography>
                      <Divider />
                      <Box margin={1}>
                        {cartContext.checkExistItem(course) ? (
                          <Button
                            fullWidth
                            variant={'contained'}
                            color={'error'}
                            onClick={() => {
                              setSelected(course);
                              setOpen(true);
                            }}
                          >
                            Bỏ khỏi giỏ hàng
                          </Button>
                        ) : (
                          <Button
                            fullWidth
                            variant={'outlined'}
                            onClick={() => {
                              addToCart(course);
                            }}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </>
                }
              >
                <Card sx={{ margin: 2, padding: 1 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="170"
                      image={course.cover && course.cover != null ? course.cover : './images/flash/Alternate.PNG' }
                      alt={course.name}
                      sx={{
                        objectFit: 'contain',
                        minHeight: '170px',
                        maxHeight: '170px',
                      }}
                      onClick={() => navigate(`/course-info/`+course.id)}
                    />
                    <CardContent>
                      <Typography noWrap variant="h6">
                        {course.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '1',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {course.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions display={'flex'} sx={{ justifyContent: 'space-between' }}>
                    <Button variant="outlined" size="small" color="primary" onClick={() => navigate('/course-info/'+course.id)}>
                        Xem thông tin 
                    </Button>
                    <Typography sx={{ marginRight: 2}}>
                      {course.price} đ
                    </Typography>
                  </CardActions>
                </Card>
              </HtmlTooltip>
            </>
          );
        })}
      </Slider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>Bạn có muốn bỏ khóa học này khỏi giỏ hàng không ?</DialogContent>
        <DialogActions>
          <Button color={'primary'} variant={'outlined'} onClick={handleClose}>
            Không
          </Button>
          <Button
            color={'error'}
            variant={'contained'}
            onClick={() => {
              setOpen(false);
              removeItem(selected);
            }}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopCart;
