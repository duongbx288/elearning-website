import React, { useEffect } from 'react';
import Home from './Home';
import FlashDeals from './components/flashDeals/FlashDeals';
import TopCate from './components/top/TopCate';
import Wrapper from './components/wrapper/Wrapper';

const Pages = () => {

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

export default Pages;
