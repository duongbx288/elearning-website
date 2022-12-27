import React from 'react';
import Header from '../../../common/header/Header';
import Footer from '../../../common/footer/Footer';

const CourseInfo = ({ CartItem, addToCart, decreaseQty }) => {
  return (
    <>
      <Header CartItem={CartItem} />

      <Footer />
    </>
  );
};

export default CourseInfo;
