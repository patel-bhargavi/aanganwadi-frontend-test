// import React from 'react'
import {  BsPersonCircle }
  from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'
import {AiFillSetting} from 'react-icons/ai'

import { Dropdown } from 'react-bootstrap';
import { useState , useEffect } from 'react';
import {BsFillCalendarFill,BsPersonVcardFill } from 'react-icons/bs'

function Header({ OpenSidebar, setIsLoggedIn }) {

   // Initialize useNavigate
  const [currentDate, setCurrentDate] = useState(new Date());
 

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


<header className='header'>
<div className='menu-icon'>
  <FiMenu className='icon' onClick={OpenSidebar} />
</div>

<div className="d-flex align-items-center">
          <BsFillCalendarFill className='icon' color='#1F51FF' />
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
      <Dropdown.Menu className='text-center mw-80px'>
        <Dropdown.Item href={`/profile`}><BsPersonVcardFill />Profile</Dropdown.Item>
        <Dropdown.Item>
         <AiFillSetting/> Settings
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</div>
</header>
  )
}

export default Header