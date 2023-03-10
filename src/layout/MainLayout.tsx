// import { Report } from '@mui/icons-material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';

import TeacherList from '../components/backend/teachers/TeacherList';
import TeacherDetail from '../components/backend/teachers/TeacherDetail';
import StudentList from '../components/backend/student/StudentList';
import AffiliateList from '../components/backend/affiliates/AffiliateList';
import StudentDetail from '../components/backend/student/StudentDetail';
import StudentUpdate from '../components/backend/student/StudentUpdate';
import AffiliateDetail from '../components/backend/affiliates/AffiliateDetail';
import CourseList from '../components/backend/courses/CourseList';
import CourseDetail from '../components/backend/courses/CourseDetail';
import OrderDetail from '../components/backend/order/OrderDetail';
import OrderList from '../components/backend/order/OrderList';
import ContactUs from '../components/backend/email/SendEmail';

const mdTheme = createTheme();

export const InitLayout = () => {
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <Navbar />
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

const MainLayout = (props: any) => {
  return (
    <Routes>
      <Route path="/admin" element={<InitLayout />}>
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
        <Route path="/admin/" element={<Navigate to={'/admin/teacher'} />} />
      </Route>
    </Routes>
  );
};

export default MainLayout;
