import React, { useEffect, useState } from 'react';
import Header from '../../../common/header/Header';
import Footer from '../../../common/footer/Footer';
import CourseService, { CourseRequest } from '../../../services/CourseService';
import { useLocation, useHistory } from 'react-router-dom';

interface CustomerState {
  id: number;
}

const CourseInfo = ({ CartItem, addToCart, decreaseQty }) => {
  const location = useLocation();
  const course = location.state as CustomerState;
  const history = useHistory();

  const [courseInfo, setCourseInfo] = useState<CourseRequest>();

  useEffect(() => {
    CourseService.getById(course.id).then((res) => {
      console.log(res.data);
      if (res.data) {
        setCourseInfo(res.data);
      }
    })
  }, []);

  return (
    <>
      <Header CartItem={CartItem} />

      <Footer />
    </>
  );
};

export default CourseInfo;
