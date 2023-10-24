// import React from 'react'
import {  BsPersonCircle }
  from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

function Header({ OpenSidebar, setIsLoggedIn }) {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async (e) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    toast.success('Logout Sucessfully')
  }

  return (
    <header className='header'>
      <div className='menu-icon'>
        <FiMenu className='icon' onClick={OpenSidebar} />
      </div>

      <div className='header-left'>

        {/* <BiMoon className='icon' onClick={togggleStyle} /> */}
        <Dropdown className='text-center'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   
          <BsPersonCircle className='icon' />
  </Dropdown.Toggle>

  <Dropdown.Menu className='text-center'>
    <Dropdown.Item href={`/profile`}>Profile</Dropdown.Item>
    <Dropdown.Item href=""> <Button onClick={handleLogout} className="btn-sm btn-danger">Logout</Button></Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>
       
      </div>

    </header>
  )
}

export default Header