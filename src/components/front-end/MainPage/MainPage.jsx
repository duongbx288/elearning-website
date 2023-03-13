import React, { useEffect } from 'react';
import Home from './components/Home';
import FlashDeals from './components/flashDeals/FlashDeals';
import TopCate from './components/top/TopCate';
import Wrapper from './components/wrapper/Wrapper';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import More from './components/More/More';
const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `ELearning - học trực tuyến`;
    // axios.get('http://127.0.0.1:8000/recommend/get-course/1').then((res) => {
    //   console.log(res.data);
    // })
  }, []);

  

  return (
    <>
      <Home />
      <FlashDeals/>
      <TopCate />
      <Wrapper />
      <More/>
    </>
  );
};

export default MainPage;
