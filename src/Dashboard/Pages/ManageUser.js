import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Modal, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner'

const ManageUser = ({ setIsLoggedIn, setIsLoading, isLoading }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  const itemsPerPage = 10;

  const closeModal = () => {
    setEditUserData(null);
    setSelectedUserId(null);
    setModalVisibility(false);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleEdit = (user) => {
    setEditUserData(user);
    setSelectedUserId(user.users_id);
    setModalVisibility(true);
  };

  const fetchData = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://aanganwadi-test.onrender.com/api/v1/user/get_users/${page}`,
        {
          params: {
            page: page,
            perPage: itemsPerPage,
          },
          headers: {
            Token: token,
          },
        }
      );
      const responseData = response.data.data;
    
      setData(responseData);
      setTotalPages(Math.ceil(response.data.total_items / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, token, itemsPerPage]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const handleUpdate = async (updatedUserData) => {
    try {
      const userId = updatedUserData.users_id;
      const response = await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/user/edit_user/${userId}`,
        updatedUserData,
        {
          headers: {
            Token: token,
          },
        }
      );
      console.log(response);
      closeModal();
      fetchData(currentPage);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/user/delete_user/${userId}`,
        null,
        {
          headers: {
            Token: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        fetchData(currentPage);
        toast.success("User deleted successfully");
      } else {
        console.error("Error deleting user:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    return data.map((item, index) => (
      <tr key={index}>
        <td>{startIndex + index}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.number}</td>
        <td>{item.users_role_id}</td>
        <td>
          <Button
            className="btn-sm btn-danger"
            onClick={() => handleDelete(item.users_id)}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleEdit(item)}
            className="btn-sm btn-primary m-2"
          >
            Edit
          </Button>
        </td>
      </tr>
    ));
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchData(pageNumber);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          <Link className="page-link" to="#" >
            {i}
          </Link>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Previous
          </Link>
        </li>
        {pageNumbers}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
    );
  };

  return (
    <>
      <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar openSidebarToggle={openSidebarToggle} setIsLoggedIn={setIsLoggedIn} OpenSidebar={OpenSidebar} />
      <main className="main-container">
        <div className="main-title">
          <h3>MANAGE USERS</h3>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="table-responsive">
            <Table responsive className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
          </div>
        )}

        <nav>{renderPagination()}</nav>
      </main>
      <Modal show={isModalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedUserData = {
                users_id: selectedUserId,
                name: e.target.name.value,
                email: e.target.email.value,
                number: e.target.number.value,
                users_role_id: e.target.users_role_id.value,
              };
              handleUpdate(updatedUserData);
            }}
          >
            <div className="mb-3 mt-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                defaultValue={editUserData ? editUserData.name : ""}
              />{" "}
              <br />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                defaultValue={editUserData ? editUserData.email : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile No</label>
              <input
                type="tel"
                id="number"
                name="number"
                className="form-control"
                defaultValue={editUserData ? editUserData.number : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="users_role_id"
                id="users_role_id"
                defaultValue={editUserData ? editUserData.users_role_id : "Admin"}
              >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary m-1">
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ManageUser;
