import React, { useEffect, useState } from "react"
import CourseService, { CourseRequest } from "../../../../../services/CourseService";
import "./style.css"
import TopCart from "./TopCart"

const TopCate = () => {

  const [courses, setCourses] = useState<CourseRequest[]>([]);
  
  useEffect(() => {
    const request: CourseRequest = {
      pageNum: 0,
      pageLimit: 5,
    };
    CourseService.getHighRating().then((res) => {
      console.log(res);
      if (res.data){
        setCourses(res.data);
      }
    })
    
  }, [])

  return (
    <>
      <section className='TopCate background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <i className='fa-solid fa-border-all'></i>
              <h2>Top Categories</h2>
            </div>
            <div className='heading-right row '>
              <span>View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <TopCart courses={courses}/>
        </div>
      </section>
    </>
  )
}

export default TopCate
