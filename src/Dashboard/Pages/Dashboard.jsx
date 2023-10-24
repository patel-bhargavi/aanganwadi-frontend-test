// import React, { useState } from 'react'
import React, { useState } from 'react';
// import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
// from 'recharts';

import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
function Dashboard({setIsLoggedIn}) {

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
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>INVENTORIES</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>22</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>SUPPLIED</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>45</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>56</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>465</h1>
          </div>
        </div>

        {/* ... (rest of the JSX code) */}
      </main>
    </>
  )
}

export default Dashboard