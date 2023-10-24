import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";


import { aanganwadi } from '../aanganwadi';

import { Link } from 'react-router-dom';
import { useState } from 'react';

import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
export default function NameList(props) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };

    // const [names,setNames] = useState(aanganwadi[0].name);
    return (
        <>
         <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className='main-container'>
                <div className='main-title'>
                    <h3>Aanganwadis</h3>
                </div>



                {/* <Table responsive>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Code</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aanganwadi.map((data) => {
                            return (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className='px-6 py-4'>
                                        <Link to="/inventory">{data.name}</Link>
                                    </td>
                                    <td className='px-6 py-4'>{data.code}</td>
                                    <td className='px-6 py-4'>{data.location}</td>
                                </tr>


                            )
                        })
                        }

                    </tbody>
                </Table> */}


                    <Table className='table'>
                        <thead>
                            <tr>

                                <th scope="col">Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aanganwadi.map((data) => {
                                return (

                                    <tr >

                                        <td>
                                            <Link to="/inventory">{data.name}</Link>
                                        </td>
                                        <td className=''>{data.code}</td>
                                        <td className=''>{data.location}</td>
                                    </tr>


                                )
                            })
                            }
                        </tbody>
                    </Table>

            </div>



        </>
    )
}
