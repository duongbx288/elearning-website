import React, { useEffect } from 'react';
import Home from './components/Home';
import FlashDeals from './components/flashDeals/FlashDeals';
import TopCate from './components/top/TopCate';
import Wrapper from './components/wrapper/Wrapper';
import axios from 'axios';

const MainPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `ELearning - học online`;
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
    </>
  );
};

export default MainPage;
