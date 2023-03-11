import * as React from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Header from '../components/front-end/header/Header';
import Footer from '../components/front-end/footer/Footer';
import Cart from '../components/front-end/Cart/Cart';
import CourseInfo from '../components/front-end/Course/CourseInfo';
import StudentInfo from '../components/front-end/Student/StudentInfo';
import StudentCourse from '../components/front-end/Student/components/StudentCourse';
import StudyCourse from '../components/front-end/Student/StudyCourse';
import AffiliateInfo from '../components/front-end/Affiliate/components/AffiliateInfo';
import CourseList from '../components/front-end/Course/CourseList';
import StudentPage from '../components/front-end/Student/StudentPage';
import AffiliatePage from '../components/front-end/Affiliate/AffiliatePage';
import MainPage from '../components/front-end/MainPage/MainPage';
import TeacherPage from '../components/front-end/teacher/TeacherPage';
import CreateCourse from '../components/front-end/teacher/components/manageCourse/CreateCourse';
import UpdateCourse from '../components/front-end/teacher/components/manageCourse/UpdateCourse';

export const HeaderFooter = () => {
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
          <Route path="main" element={<MainPage />} />
          <Route path="cart" element={<Cart />}></Route>
          <Route path="course-list" element={<CourseList />}></Route>
          <Route path="course-info/:id" element={<CourseInfo/>} />
          {/* <Route path="course-info/:id/:affiliateId" element={<CourseInfo/>} /> */}
          <Route path="course-info/:id/:redirectParam" element={<CourseInfo/>} />
          <Route path="course-update/:id/teacher/:teacherId" element={<UpdateCourse/>} />
          <Route path="" element={<Navigate to="main"/>}/>
          <Route path="student-info/:id" element={<StudentInfo/>}></Route>
          <Route path="student-page/:id" element={<StudentPage/>}></Route>
          {/* <Route path="student-course/:id" element={<StudentCourse/>}></Route> */}
          <Route path="study-course/course/:courseId/student/:studentId" element={<StudyCourse/>}></Route>
          <Route path="affiliate-page/:id" element={<AffiliatePage/>}></Route>
          <Route path="teacher-page/:id" element={<TeacherPage/>}></Route>
          <Route path="teacher-page/:id/create-course" element={<CreateCourse/>}></Route>
          
        </Route>
      </Routes>
    </>
  );
};

export default ClientMainLayout;
