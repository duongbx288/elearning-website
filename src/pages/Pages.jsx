import React from 'react';
import Home from '../components/front-end/MainPage/Home';
import FlashDeals from '../components/front-end/MainPage/components/flashDeals/FlashDeals';
import TopCate from '../components/front-end/MainPage/components/top/TopCate';
import NewArrivals from '../components/front-end/MainPage/components/newarrivals/NewArrivals';
import Discount from '../components/front-end/MainPage/components/discount/Discount';
import Shop from '../components/front-end/MainPage/components/shops/Shop';
import Annocument from '../components/front-end/MainPage/components/annocument/Annocument';
import Wrapper from '../components/front-end/MainPage/components/wrapper/Wrapper';
import Header from '../components/front-end/header/Header';
import Footer from '../components/front-end/footer/Footer';
import Data from '../components/front-end/Data';

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
