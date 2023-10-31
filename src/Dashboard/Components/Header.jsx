// import React from 'react'
import {  BsPersonCircle }
  from 'react-icons/bs'
import {FiMenu} from 'react-icons/fi'
import {AiFillSetting} from 'react-icons/ai'

import { Dropdown, Modal } from 'react-bootstrap';

import { useState , useEffect } from 'react';
import {BsFillCalendarFill } from 'react-icons/bs'
import {MdAccountBox} from 'react-icons/md';


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

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
<>

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
    <Dropdown className=''>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        <BsPersonCircle className='' />
      </Dropdown.Toggle>
      <Dropdown.Menu className='text-start' style={{minWidth:"7rem"}}>
        <Dropdown.Item href={`/profile`}>
          <MdAccountBox /> Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={toggleModal} >
        <AiFillSetting /> Settings
      </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  </div>
</div>
</header>
<Modal show={showModal} onHide={toggleModal} dialogClassName="modal-dialog-right"> 
        <Modal.Header closeButton>
          <Modal.Title>Language Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your selection input and settings content here */}
          <p>Select Language</p>

        </Modal.Body>
      </Modal>

        </>
  )
}

export default Header