import React, { useEffect, useState } from 'react';
import FlashCard from './FlashCard';
import './style.css';
import CourseService, { CourseRequest } from '../../../../../services/CourseService';

const FlashDeals = () => {
  const [courses, setCourses] = useState<CourseRequest[]>([]);

  useEffect(() => {
    const request:CourseRequest = {
      pageNum: 0,
      pageLimit: 5,
    };
    CourseService.getAllPag(request).then((res) => {
      console.log(res);
      if (res.data.content.length > 0) {
        setCourses(res.data.content);
      }
    });
  }, []);

  return (
    <>
      <section className="flash">
        <div className="container">
          <div className="heading f_flex">
            <i className="fa fa-bolt"></i>
            <h4>Tìm kiếm nhanh</h4>
          </div>
          <FlashCard courses={courses} />
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
