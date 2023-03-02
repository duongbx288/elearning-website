import React, { useEffect } from 'react';
import Home from './components/Home';
import FlashDeals from './components/flashDeals/FlashDeals';
import TopCate from './components/top/TopCate';
import Wrapper from './components/wrapper/Wrapper';

const MainPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `ELearning - học online`
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
