import React from 'react';
import Home from '../components/front-end/MainPage/Home';
import FlashDeals from '../components/front-end/MainPage/components/flashDeals/FlashDeals';
import TopCate from '../components/front-end/MainPage/components/top/TopCate';
import NewArrivals from '../components/front-end/MainPage/components/newarrivals/NewArrivals';
import Discount from '../components/front-end/MainPage/components/discount/Discount';
import Shop from '../components/front-end/MainPage/components/shops/Shop';
import Annocument from '../components/front-end/MainPage/components/annocument/Annocument';
import Wrapper from '../components/front-end/MainPage/components/wrapper/Wrapper';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Header CartItem={CartItem} />
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <Annocument />
      <Wrapper />
      <Footer />
    </>
  );
};

export default Pages;
