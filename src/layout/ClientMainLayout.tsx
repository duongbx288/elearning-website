import * as React from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Header from '../components/front-end/header/Header';
import Footer from '../components/front-end/footer/Footer';
import Pages from '../components/front-end/MainPage/Pages';
import Cart from '../components/front-end/Cart/Cart';
import CourseInfo from '../components/front-end/Course/CourseInfo';
import StudentInfo from '../components/front-end/Student/StudentInfo';
import StudentCourse from '../components/front-end/Student/StudentCourse';
import StudyCourse from '../components/front-end/Student/StudyCourse';
import AffiliateInfo from '../components/front-end/Affiliate/AffiliateInfo';

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
          <Route path="course-info/:id" element={<CourseInfo />}></Route>
          {/* <Route path="" element={<Navigate to="main"/>}/> */}
          <Route path="student-info/:id" element={<StudentInfo/>}></Route>
          <Route path="student-course/:id" element={<StudentCourse/>}></Route>
          <Route path="study-course/course=:id/student=:id" element={<StudyCourse/>}></Route>
          <Route path="affiliate-info/affiliate=:id" element={<AffiliateInfo/>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default ClientMainLayout;
