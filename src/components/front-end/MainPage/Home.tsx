import React from 'react';
// import Categories from "./Categories"
// import './Home.css';
// import SliderHome from "./Slider"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{
          height: '450px',
          margin: '5px 30px 5px 30px',
          // borderTop: '1px solid black',
          // borderBottom: '1px solid black',
        }}
      >
        <SwiperSlide>
          <Grid container height={'100%'}>
            <Grid
              item
              xs={8}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Item>xs=8</Item>
                <Typography variant="h4">Hello</Typography>
                <Typography>Hello</Typography>
                <Typography>Hello</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box component="img" alt="" src=""></Box>
            </Grid>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid container height={'100%'}>
            <Grid
              item
              xs={8}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box>
                <Item>xs=8</Item>
                <Typography variant="h4">Hello</Typography>
                <Typography>Hello</Typography>
                <Typography>Hello</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box component="img" alt="" src=""></Box>
            </Grid>
          </Grid>
        </SwiperSlide>  
      </Swiper>
    </>
  );
};

export default Home;
