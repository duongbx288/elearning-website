import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from '@mui/material/Rating';
import { useHistory } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import './style.css';
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
const FlashCard = ({ courses, addToCart }) => {
  const history = useHistory();
  const [count, setCount] = useState(0);
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

  const handleCourse = (id) => () => {
    history.push({
      pathname: '/course-info',
      state: { id: id },
    });
  };

  return (
    <>
      <Slider {...settings}>
        {courses.map((course) => {
          return (
            <div className="box flash-card">
              <div className="product mtop">
                <div className="img">
                  {course.discount ? (
                    <span className="discount">{course.discount}% Off</span>
                  ) : (
                    <></>
                  )}
                  <div className='container-img'>
                  <img src={course.cover ? course.cover : './images/flash/Alternate.PNG'} alt="" />
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
                  <Rating value={course.rating ? course.rating : 0} sx={{ margin: 0, fontSize: '15px' }} />
                  <div className="price">
                    <h5>{course.price} đ </h5>
                    <button onClick={() => addToCart(course)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FlashCard;
