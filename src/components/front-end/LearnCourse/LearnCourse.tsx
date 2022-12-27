import React from 'react';
import Header from '../../../common/header/Header';
import Footer from '../../../common/footer/Footer';

const LearnCourse = ({ CartItem, addToCart, decreaseQty }) => {
  return (
    <>
      <Header CartItem={CartItem} />

      <Footer />
    </>
  );
};

export default LearnCourse;
