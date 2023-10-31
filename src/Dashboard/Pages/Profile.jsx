import React, { useState } from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import '../CSS/Profile.css';

const Profile = ({ setIsLoggedIn }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("profile")));
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleSaveChanges = async () => {
        try {
            // Send a PUT request to update the profile
            const response = await axios.post(
                'https://aanganwadi-test.onrender.com/api/v1/user/edit_profile',
                profileData, // Send the updated profile data
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );

            if (response.data.status === "success") {
                toast.success("Profile updated successfully");
                // Update the local storage with the updated profile
                localStorage.setItem("profile", JSON.stringify(profileData));
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    return (
        <>
            <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
            <Sidebar openSidebarToggle={openSidebarToggle} setIsLoggedIn={setIsLoggedIn} OpenSidebar={OpenSidebar} />
            <main className="main-container">
                <div className="custom-container">
                    <div className="p-4 mb-4 ml-2 bg-light rounded-3 custom-form">
                        <h2>Profile</h2>
                        <div className="container-xl px-4 mt-4">
                            <hr className="mt-0 mb-4" />
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-body text-center">
                                            <img className="img-account-profile rounded-circle mb-2" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />
                                            <div className="font-italic mb-1 h4">{profileData.name}</div>
                                            <div className="small font-italic text-muted">{profileData.email}</div>
                                            <div className="small font-italic text-muted">{profileData.c}</div>
                                            <div className="small font-italic text-muted">Role: <b>{profileData.users_role_id}</b></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Edit Account Details</div>
                                        <div className="card-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputUsername">Name</label>
                                                    <input
                                                        className="form-control"
                                                        id="inputUsername"
                                                        type="text"
                                                        placeholder="Enter your username"
                                                        name="name"
                                                        value={profileData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                                    <input
                                                        className="form-control"
                                                        id="inputEmailAddress"
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        name="email"
                                                        value={profileData.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                        <input
                                                            className="form-control"
                                                            id="inputPhone"
                                                            type="tel"
                                                            placeholder="Enter your phone number"
                                                            name="number"
                                                            value={profileData.number}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary" type="button" onClick={handleSaveChanges}>Save changes</button>
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
    );
};

export default Profile;
