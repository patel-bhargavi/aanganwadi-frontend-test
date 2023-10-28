// import React, { useState } from 'react'
import React, { useState } from "react";
// import axios from 'axios';

import '../CSS/Dashboard.css'

import { BiSolidTruck, BiSolidBuilding } from "react-icons/bi";
import { FaBoxes, FaRupeeSign } from "react-icons/fa";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
function Dashboard({ setIsLoggedIn }) {
  // const [data, setData] = useState([{
  //   inventory_count: 0,
  //   supply_count: 0,
  //   customer_count: 0,
  //   alerts_count: 0,
  // }]);

  // const fetchInfo = async () => {

  //   return axios.get('https://49cf-2401-4900-78f3-88d5-bde6-d49d-8cc7-66cd.ngrok.io/fetch_counts').then(response => {
  //     console.log(response)
  //     setData(response.data);
  //   });
  // }

  // useEffect(() => {
  //   fetchInfo();
  // }, []);

  // let counts = {};
  // data.map((data, index) => {
  //   counts.inventory_count = data.inventory_count;
  //   counts.customer_count = data.customer_count;
  //   counts.alerts_count = data.alerts_count;
  //   counts.supply_count = data.supply_count;
  //   return 1;
  // })

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
      />

      <main className="main-container">
      <div className="custom-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="dashboard-card-container  d-flex mt-4">
          <div className="dashboard-card d-flex flex-row">
            <div className="card-icon" id="card1">
              <BiSolidTruck />
            </div>
            <div className="card-desc text-center">
              <p className="card-title mt-">Supplied</p>
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
        </div>
        {/* ... (rest of the JSX code) */}
      </main>
    </>
  );
}

export default Dashboard;