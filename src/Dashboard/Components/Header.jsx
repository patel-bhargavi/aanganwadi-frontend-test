// import React from 'react'
import {  BsPersonCircle }
  from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useState , useEffect } from 'react';
import {BsFillCalendarFill} from 'react-icons/bs'

function Header({ OpenSidebar, setIsLoggedIn }) {

  const navigate = useNavigate(); // Initialize useNavigate
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleLogout = async (e) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    toast.success('Logout Sucessfully')
  }

  const dropdownStyles = {
    position: 'absolute',
    right: '15px', // Adjust the left position as needed
     // Adjust the top position as needed
     top:'30px',
    transform: 'translateY(-50%)',
  };

  useEffect(() => {
    // Update the current date and time every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short', 
    day: '2-digit',
    weekday: 'long',
  }).format(currentDate);


  return (
//     <header className='header'>
//       <div className='menu-icon'>
//         <FiMenu className='icon' onClick={OpenSidebar} />
//       </div>

//       <div className=''>
        
//         <BsFillCalendarFill className='' />
//       <div className="date-day">
//           {formattedDate}
//         </div>
//       </div>
//       <div className='header-left'>

//       <div style={dropdownStyles}>
//         {/* <BiMoon className='icon' onClick={togggleStyle} /> */}
//         <Dropdown className='text-center'>
//   <Dropdown.Toggle variant="success" id="dropdown-basic">
   
//           <BsPersonCircle className='icon' />
//   </Dropdown.Toggle>

//   <Dropdown.Menu className='text-center'>
//     <Dropdown.Item href={`/profile`}>Profile</Dropdown.Item>
//     <Dropdown.Item href=""> <Button onClick={handleLogout} className="btn-sm btn-danger">Logout</Button></Dropdown.Item>
   
//   </Dropdown.Menu>
// </Dropdown>
// </div>
       
//       </div>

//     </header>

<header className='header'>
<div className='menu-icon'>
  <FiMenu className='icon' onClick={OpenSidebar} />
</div>

<div className="d-flex align-items-center">
          <BsFillCalendarFill className='icon' />
          <div className="date-day">
            {formattedDate}
          </div>
        </div>

<div className='header-left'>
  <div style={dropdownStyles} >
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <BsPersonCircle className='' />
      </Dropdown.Toggle>
      <Dropdown.Menu className='text-center'>
        <Dropdown.Item href={`/profile`}>Profile</Dropdown.Item>
        <Dropdown.Item>
          <Button onClick={handleLogout} className="btn-sm btn-danger">Logout</Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</div>
</header>
  )
}

export default Header