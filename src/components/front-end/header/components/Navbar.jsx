import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>
    
      <header className='header'>
        <div className='container d_flex'>
          {/* <div className='catgrories d_flex' style={{ cursor: 'pointer', backgroundcolor: '#fff' }}>
            <span className='fa-solid fa-border-all'></span>
            <h5>
              Danh mục <i className='fa fa-chevron-down'></i>
            </h5>
          </div> */}

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/main'>Trang chủ</Link>
              </li>
              <li>
                <Link to='/course'>Khóa học</Link>
              </li>
              {/* <li>
                <Link to='/user'>user account</Link>
              </li>
              <li>
                <Link to='/vendor'>vendor account</Link>
              </li>
              <li>
                <Link to='/track'>track my order</Link>
              </li> */}
              <li>
                <Link to='/contact'>Liên hệ</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
