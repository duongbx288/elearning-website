import React, { useEffect, useState } from 'react';
import FlashCard from './FlashCard';
import './style.css';
import CourseService, { CourseRequest } from '../../../../../services/CourseService';

const FlashDeals = () => {
  const [courses, setCourses] = useState<CourseRequest[]>([]);

  useEffect(() => {
    CourseService.getNewCourses().then((res) => {
      if (res.data) {
        setCourses(res.data);
      }
    });
  }, []);

  return (
    <>
      <section className="flash">
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h4>Khóa học mới</h4>
          </div>
          <FlashCard courses={courses} />
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
