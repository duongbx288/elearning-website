import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { getSession } from './auth/authenticationSlice';
import Login from './components/backend/auth/Login';
import MainLayout, { InitLayout } from './layout/MainLayout';
import { RootState } from './store/store';
// import PrivateRoute from './auth/private-route';

import ClientMainLayout from './layout/ClientMainLayout';

import SignIn from './components/front-end/auth/SignIn';

import { CartProvider } from './context/CartContext';
import { CourseProvider } from './context/CourseBoughtContext';
import { RequireAuth } from './auth/RequireAuth';
import AffiliateDetail from './components/backend/affiliates/AffiliateDetail';
import AffiliateList from './components/backend/affiliates/AffiliateList';
import CourseDetail from './components/backend/courses/CourseDetail';
import CourseList from './components/backend/courses/CourseList';
import ContactUs from './components/backend/email/SendEmail';
import OrderDetail from './components/backend/order/OrderDetail';
import OrderList from './components/backend/order/OrderList';
import StudentDetail from './components/backend/student/StudentDetail';
import StudentList from './components/backend/student/StudentList';
import StudentUpdate from './components/backend/student/StudentUpdate';
import TeacherDetail from './components/backend/teachers/TeacherDetail';
import TeacherList from './components/backend/teachers/TeacherList';
import { Pages } from '@mui/icons-material';
import Cart from './components/front-end/Cart/Cart';
import CourseInfo from './components/front-end/Course/CourseInfo';
import StudentCourse from './components/front-end/Student/StudentCourse';
import StudentInfo from './components/front-end/Student/StudentInfo';
import StudyCourse from './components/front-end/Student/StudyCourse';

interface AppProps extends PropsFromRedux {}

const App = (props: AppProps) => {
  const { sessionHasBeenFetched, isAuthenticated, getSession } = props;

  useEffect(() => {
    getSession();
  }, []);

  return (
    <CartProvider>
      <CourseProvider>
        <Router>
          <React.Fragment>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/sign-in" element={<SignIn />} />
              {/* <Route
                path="/"
                element={
                  <RequireAuth redirectTo={'/login'}>
                    <MainLayout/>
                  </RequireAuth>
                }
              ></Route> */}
              {/* <Route path="/admin" element={<InitLayout />}>
                <Route path="/admin/teacher" element={<TeacherList />} />
                <Route path="/admin/teacher/detail/:id" element={<TeacherDetail />} />
                <Route path="/admin/student" element={<StudentList />} />
                <Route path="/admin/student/detail/:id" element={<StudentDetail />} />
                <Route path="/admin/student/update/:id" element={<StudentUpdate />} />
                <Route path="/admin/affiliate" element={<AffiliateList />} />
                <Route path="/admin/affiliate/detail/:id" element={<AffiliateDetail />} />
                <Route path="/admin/course" element={<CourseList />} />
                <Route path="/admin/course/detail/:id" element={<CourseDetail />} />
                <Route path="/admin/order/detail/:id" element={<OrderDetail />} />
                <Route path="/admin/order" element={<OrderList />} />
                <Route path="/admin/send-email" element={<ContactUs />} />
                <Route path="/admin/" element={<Navigate to={'admin/teacher'} />} />
              </Route>
              <Route path="/" element={<HeaderFooter />}>
                <Route path="main" element={<Pages />} />
                <Route path="cart" element={<Cart />}></Route>
                <Route path="course-info/:id" element={<CourseInfo />}></Route>
                <Route path="" element={<Navigate to="main" />} />
                <Route path="student-info/:id" element={<StudentInfo />}></Route>
                <Route path="student-course/:id" element={<StudentCourse />}></Route>
                <Route
                  path="study-course/course=:id/student=:id"
                  element={<StudyCourse />}
                ></Route>
              </Route> */}
            </Routes>
            <ClientMainLayout />
            <MainLayout/>
          </React.Fragment>
        </Router>
      </CourseProvider>
    </CartProvider>
  );
};

// có thể dùng hooks thay connector => https://react-redux.js.org/tutorials/typescript-quick-start#use-typed-hooks-in-components

const mapState = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  sessionHasBeenFetched: authentication.sessionHasBeenFetched,
});

const mapDispatch = {
  getSession,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
