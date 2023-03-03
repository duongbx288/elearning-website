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
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
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
          <div
            style={{
              height: '100%',
              // background: 'aqua',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundImage:
                "url('https://www.harvard.edu/wp-content/uploads/2021/02/091520_Stock_KS_025-1200x630.jpeg')",
            }}
          >
            <Box
              display="flex"
              flexDirection={'column'}
              position="absolute"
              left={'10%'}
              top={'100px'}
              padding={2}
              sx={{ bgcolor: '#ffffff', color: '#000000', fontFamily: 'Gloock, serif' }}
            >
              <Box marginRight={2}>
                {' '}
                <Typography
                  sx={{ fontFamily: 'Gloock, serif', marginBottom: 1 }}
                  variant="h3"
                >
                  Học và phát triển
                </Typography>
                <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>
                  Các kĩ năng cần thiết. Hãy bắt đầu
                </Typography>
                <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>
                  học cùng chúng tôi.
                </Typography>
              </Box>
            </Box>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              height: '100%',
              // background: 'aqua',
              backgroundImage:
                "url('https://www.harvard.edu/wp-content/uploads/2021/02/091520_Stock_KS_025-1200x630.jpeg')",
            }}
          >
            <Box
              display="flex"
              flexDirection={'column'}
              position="absolute"
              left={'10%'}
              top={'100px'}
              padding={2}
              sx={{ bgcolor: '#ffffff', color: '#000000' }}
            >
              <Box marginRight={2}>
                {' '}
                <Typography
                  sx={{ fontFamily: 'Gloock, serif', marginBottom: 1 }}
                  variant="h3"
                >
                  Học và phát triển
                </Typography>
                <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>
                  Các kĩ năng cần thiết. Hãy bắt đầu
                </Typography>
                <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>
                  học cùng chúng tôi.
                </Typography>
              </Box>
            </Box>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Home;
