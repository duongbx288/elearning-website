import React from 'react';
import Home from '../components/front-end/MainPage/Home';
import FlashDeals from '../components/front-end/MainPage/components/flashDeals/FlashDeals';
import TopCate from '../components/front-end/MainPage/components/top/TopCate';
import Wrapper from '../components/front-end/MainPage/components/wrapper/Wrapper';

const Pages = () => {

  return (
    <>
      <Home />
      <FlashDeals/>
      <TopCate />
      {/* <NewArrivals />
      <Discount />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument /> */}
      <Wrapper />
    </>
  );
};

export default Pages;
