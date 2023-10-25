import React from 'react'
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar'
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import "bootstrap/dist/css/bootstrap.css";


import { useNavigate } from 'react-router-dom';

const AddUser = ({ setIsLoggedIn }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const navigate = useNavigate();
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        number: '',
        users_role_id: 'Admin',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUser = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the signup endpoint with the token in the Authorization header
            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.post('https://aanganwadi-test.onrender.com/api/v1/user/add_user', formData, {
                headers: {
                    Token: token // Replace YOUR_TOKEN with the actual token
                },
            });
            
            console.log('Signup successful:', response.data);

            setFormData({
                name: '',
                email: '',
                password: '',
                number: '',
                users_role_id: 'Admin',
            });
            
            toast.success("User Added Successfully");
            navigate('/manage-users')

        } catch (error) {
            console.error('Signup failed:', error);
        }
    }


    return (
        <>
            <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <main className="main-container">
                <div className="custom-container">
                    <div className="p-5 mb-4 ml-3 bg-light rounded-3 custom-form">
                        <h2>Add User</h2>


                        <form onSubmit={handleUser}>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                /> <br />
                            </div>
                            <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">

                            <label className="form-label">Password</label> 
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange} />
                           </div>

                           <div className="mb-3">

                           <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                className="form-control"

                                value={formData.number}
                                onChange={handleInputChange} /> 
                            </div>

                            <div className="mb-3">
          <label className="form-label">Role</label>
                            <select className="form-select" name="users_role_id" id="users_role_id" 
                            value={formData.users_role_id}
                                    onChange={handleInputChange}
                                    >
                                <option 
                               
                                    >Admin</option>
                                <option 
                                
                                    >Employee</option>

                            </select>
                            </div>
                            <button className="btn btn-primary">Add User</button>
                        </form>
                    </div>
                    </div>
                    

                    </main>
                </>
                )
}

                export default AddUser
