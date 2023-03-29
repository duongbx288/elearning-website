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

import ClientMainLayout, { HeaderFooter } from './layout/ClientMainLayout';

import SignIn from './components/front-end/auth/SignIn';

import { CartProvider } from './context/CartContext';
import { CourseProvider } from './context/CourseBoughtContext';
import AffiliateRegister from './components/front-end/auth/AffiliateRegister';
import TeacherRegister from './components/front-end/auth/TeacherRegister';

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
              <Route path="affiliate-register" element={<AffiliateRegister />}/>
              <Route path="teacher-register" element={<TeacherRegister />}/>
              {/* <Route
                path="/admin"
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
              </Route> */}
              {/* <Route path="/" element={<HeaderFooter />}>
                <Route path="main" element={<MainPage />} />
                <Route path="cart" element={<Cart />}></Route>
                <Route path="course-list" element={<CourseList />}></Route>
                <Route path="course-info/:id" element={<CourseInfo />}></Route>
                <Route path="student-info/:id" element={<StudentInfo />}></Route>
                <Route path="student-page/:id" element={<StudentPage />}></Route>
                <Route
                  path="study-course/course=:id/student=:id"
                  element={<StudyCourse />}
                ></Route>
                <Route
                  path="affiliate-page/affiliate:id"
                  element={<AffiliatePage />}
                ></Route>
              </Route> */}
            </Routes>
            <ClientMainLayout />
            <MainLayout />
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
