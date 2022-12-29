import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../components/front-end/header/Header';
import Footer from '../components/front-end/footer/Footer';
import Pages from '../pages/Pages';
import Cart from '../components/front-end/Cart/Cart';
import CourseInfo from '../components/front-end/Course/CourseInfo';
import LearnCourse from '../components/front-end/LearnCourse/LearnCourse';

const ClientMainLayout = () => {

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/main">
          <Pages />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/learn">
          <LearnCourse />
        </Route>
        <Route exact path="/course-info">
          <CourseInfo />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default ClientMainLayout;
