import * as React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from '../components/front-end/header/Header';
import Footer from '../components/front-end/footer/Footer';
import Pages from '../pages/Pages';
import Cart from '../components/front-end/Cart/Cart';
import CourseInfo from '../components/front-end/Course/CourseInfo';
import LearnCourse from '../components/front-end/LearnCourse/LearnCourse';

const HeaderFooter = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const ClientMainLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderFooter />}>
          <Route path="main" element={<Pages />} />
          <Route path="cart" element={<Cart />}></Route>
          <Route path="learn" element={<LearnCourse />}></Route>
          <Route path="course-info" element={<CourseInfo />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default ClientMainLayout;
