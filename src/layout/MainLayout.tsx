// import { Report } from '@mui/icons-material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Reports from '../pages/Report';
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

import Header from "../common/header/Header";
import Pages from "../pages/Pages";
import Data from "../components/front-end/Data";
import Cart from "../common/Cart/Cart";
import Footer from "../common/footer/Footer"
import Sdata from "../components/front-end/shops/Sdata";

const mdTheme = createTheme();

const MainLayout = (props: any) => {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/*navbar*/}  
        <Navbar />

        {/* main content here */}
        <Box
          component="main"
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
          <Switch>
            <Route exact path="/report" component={Reports} />
            <Route exact path="/teacher" component={TeacherList} />
            <Route exact path="/teacher/detail/:id" component={TeacherDetail} />
            <Route exact path="/student" component={StudentList} />
            <Route exact path="/student/detail/:id" component={StudentDetail} />
            <Route exact path="/student/update/:id" component={StudentUpdate} />
            <Route exact path="/affiliate" component={AffiliateList} />
            <Route exact path="/affiliate/detail/:id" component={AffiliateDetail} />
            <Route exact path="/course" component={CourseList} />
            <Route exact path="/course/detail/:id" component={CourseDetail} />
            <Route exact path="/order/detail/:id" component={OrderDetail} />
            <Route exact path="/order" component={OrderList} />
            <Route exact path="/">
              <Redirect to="/student" />
            </Route>
            <Route exact path="/send-email" component={ContactUs}/>
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
