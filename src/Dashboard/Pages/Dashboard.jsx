// import React, { useState } from 'react'
import React, { useState  } from "react";


import '../CSS/Dashboard.css'

import { BiSolidTruck, BiSolidBuilding } from "react-icons/bi";
import { FaBoxes, FaRupeeSign } from "react-icons/fa";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
function Dashboard({ setIsLoggedIn }) {
 

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


  
  return (
    <>
      <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main className="main-container">
      {/* <div className="custom-container"> */}
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="dashboard-card-container d-flex mt-4">
          <div className="dashboard-card d-flex flex-row">
            <div className="card-icon" id="card1">
              <BiSolidTruck />
            </div>
            <div className="card-desc text-center">
              <p className="card-title mt-2">Supplied</p>
              <p className="card-info">12.2 K</p>
            </div>
          </div>
          <div className="dashboard-card d-flex flex-row">
            <div className="card-icon" id="card2">
              <FaBoxes />
            </div>
            <div className="card-desc">
              <p className="card-title mt-2">Available</p>
              <p className="card-info">22.3 K</p>
            </div>
          </div>
          <div className="dashboard-card d-flex flex-row">
            <div className="card-icon" id="card3">
              <FaRupeeSign />
            </div>
            <div className="card-desc">
              <p className="card-title mt-2">Budget</p>
              <p className="card-info">₹ 5.2 cr</p>
            </div>
          </div>
          <div className="dashboard-card d-flex flex-row">
            <div className="card-icon" id="card4">
              <BiSolidBuilding />
            </div>
            <div className="card-desc">
              <p className="card-title mt-2">Aanganwadi</p>
              <p className="card-info"> 1134</p>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* ... (rest of the JSX code) */}
      </main>
    </>
  );
}

export default Dashboard;