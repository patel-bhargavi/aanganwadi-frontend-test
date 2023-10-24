import React from 'react'
import { useState } from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Profile = ({ setIsLoggedIn }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);


    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
   
    return (
        <>
            <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className="main-container">
                <div className="custom-container">
                    <div className="p-5 mb-4 ml-3 bg-light rounded-3 custom-form">
                        <h2>Profile</h2>
                       
                    </div>

                </div>


            </main>
        </>
    )
}

export default Profile
