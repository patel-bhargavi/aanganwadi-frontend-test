import React from 'react'
import { useState , useEffect} from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import '../CSS/Profile.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';






const Profile = ({ setIsLoggedIn }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };



    const [profileData, setProfileData] = useState({});

    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://aanganwadi-test.onrender.com/api/v1/user/user_info', {
                headers: {
                    Token: token,
                },
            });
    
            // Decrypt the data using CryptoJS and your secret key
            const decryptedData = CryptoJS.AES.decrypt(response.data.data, 'secret_key_not_so_secret_aanganwadi');
    
            // Convert the decrypted data to a string
            const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    
            // Parse the decrypted data as JSON
            const parsedData = JSON.parse(decryptedText);
    
            // Update the profileData state with the decrypted data
            setProfileData(parsedData);
    
            console.log(parsedData);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };
    
      useEffect(() => {
        fetchProfileData();
      }, []); // The empty dependency array ensures this runs only once on component mount
      
      

    return (
        <>
            <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
            <Sidebar openSidebarToggle={openSidebarToggle} setIsLoggedIn={setIsLoggedIn} OpenSidebar={OpenSidebar} />
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

                   

                                      
                                        <div className="card-body text-center">

                                            <img className="img-account-profile rounded-circle mb-2" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />


                                            <div className="font-italic mb-1 h4">{profileData.name}</div>
                                            <div className="small font-italic text-muted">{profileData.email}</div>
                                            <div className="small font-italic text-muted">{profileData.number}</div>
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

                                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={profileData.name} />

                                                    

                                                </div>

                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={profileData.email} />
                                                </div>

                                                <div className="row gx-3 mb-3">

                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={profileData.number}/>
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