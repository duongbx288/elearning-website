import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import './style.css';
import { CartContext } from '../../../../../context/CartContext';
import { styled } from '@mui/material/styles';

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i
          className="fa fa-long-arrow-alt-right"
          style={{ transform: 'translateY: -5px' }}
        ></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i
          className="fa fa-long-arrow-alt-left"
          style={{ transform: 'translateY: -5px' }}
        ></i>
      </button>
    </div>
  );
};

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

const FlashCard = ({ courses }) => {
  const cartContext = useContext(CartContext).cartInfo;
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Dialog
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
    navigate('/course-info/' + id,
      {state: { id: id }},
    );
  };

  return (
    <>
      <Slider {...settings}>
        {courses.map((course) => {
          return (
            <div className="box flash-card">
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
                          WebkitLineClamp: '8',
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '1',
                          whiteSpace: 'pre-line'
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
                <div className="product mtop">
                  <div className="img" onClick={handleCourse(course.id)} style={{cursor: 'pointer'}}>
                    {course.discount ? (
                      <span className="discount">{course.discount}% Off</span>
                    ) : (
                      <></>
                    )}
                    <div className="container-img">
                      <img
                        src={course.cover ? course.cover : './images/flash/Alternate.PNG'}
                        alt=""
                      />
                    </div>
                    <Divider />
                    <div className="product-like">
                      <label>{count}</label> <br />
                      <i className="fa-regular fa-heart" onClick={increment}></i>
                    </div>
                  </div>
                  <div className="product-details">
                    <Typography
                      variant="h3"
                      sx={{ cursor: 'pointer' }}
                      onClick={handleCourse(course.id)}
                    >
                      {course.name}
                    </Typography>
                    <Rating
                      readOnly
                      value={course.rating ? course.rating : 0}
                      sx={{ margin: 0, fontSize: '15px' }}
                    />
                    <div className="price">
                      <h5>{course.price} đ </h5>
                      <button onClick={() => addToCart(course)}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </HtmlTooltip>
            </div>
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

export default FlashCard;
