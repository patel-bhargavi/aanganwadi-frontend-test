import React from 'react'
import { useState } from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import '../CSS/Profile.css';

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
                    <div className="p-4 mb-4 ml-2 bg-light rounded-3 custom-form">
                        <h2>Profile</h2>
                        <div className="container-xl px-4 mt-4">
                            {/* Account page navigation*/}

                            <hr className="mt-0 mb-4" />
                            <div className="row">
                                <div className="col-xl-4">
                                    {/* Profile picture card*/}
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">Profile Picture</div>
                                        <div className="card-body text-center">

                                            <img className="img-account-profile rounded-circle mb-2" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />

                                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                                            <button className="btn btn-primary" type="button">Upload new image</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">

                                    <div className="card mb-4">
                                        <div className="card-header">Account Details</div>
                                        <div className="card-body">
                                            <form>

                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputUsername">Name(how your name will appear to other users on the site)</label>
                                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username" />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                                                </div>

                                                <div className="row gx-3 mb-3">

                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567" />
                                                    </div>


                                                </div>

                                                <button className="btn btn-primary" type="button">Save changes</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </main>
        </>
    )
}

export default Profile