import React from 'react'
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.css";
import {  Table, Button } from "react-bootstrap";



// import { useNavigate } from 'react-router-dom';

const AddCategory = ({ setIsLoggedIn }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    // const navigate = useNavigate();
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
            toast.success('Added successfully')
            // navigate('/dashboard');


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
                        <h2>Add Category</h2>


                        <form onSubmit={handleUser}>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Category Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                /> <br />
                            </div>
                           
                            <button className="btn btn-primary">Add Category</button>
                        </form>

                                </div>
                        <Table responsive className="table table-striped table-hover">
            <thead>
              <tr>
              
                <th>Name</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
             
                <tr>
                  <td>Food</td>          
                  <td>
                    <Button
                      className="btn-sm btn-danger"
                    //   onClick={() => handleDelete(item.users_id)}
                    >
                      Delete
                    </Button>
                    <Button
                    //   onClick={() => handleEdit(item)}
                      className="btn-sm btn-primary m-2"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Health</td>          
                  <td>
                    <Button
                      className="btn-sm btn-danger"
                    //   onClick={() => handleDelete(item.users_id)}
                    >
                      Delete
                    </Button>
                    <Button
                    //   onClick={() => handleEdit(item)}
                      className="btn-sm btn-primary m-2"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
            
            </tbody>
          </Table>
                </div>


            </main>
        </>
    )
}

export default AddCategory
