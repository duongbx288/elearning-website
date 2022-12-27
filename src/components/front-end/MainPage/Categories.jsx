import React, { useEffect, useState } from "react"
import TypeService from "../../../services/TypeService";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    TypeService.getAllType().then((res) => {
      if (res.data){
        setCategories(res.data);
      }
     })
  }, []);

  return (
    <>
      <div className='category'>
        {categories.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
