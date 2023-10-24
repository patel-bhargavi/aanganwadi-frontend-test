// import React from 'react'
import {  BsPersonCircle, BsJustify }
  from 'react-icons/bs'

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

function Header({ OpenSidebar, setIsLoggedIn }) {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async (e) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    toast('Logout Success')
  }

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>

      <div className='header-left'>

        {/* <BiMoon className='icon' onClick={togggleStyle} /> */}
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   
          <BsPersonCircle className='icon' />
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="">Profile</Dropdown.Item>
    <Dropdown.Item href=""> <Button onClick={handleLogout} className="btn btn-danger">Logout</Button></Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>
       
      </div>

    </header>
  )
}

export default Header