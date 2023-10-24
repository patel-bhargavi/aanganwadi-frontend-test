import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
// import { RiDeleteBin6Fill } from "react-icons/ri";
import { Modal, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useCallback } from "react";

const ManageUser = ({ setIsLoggedIn }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // const [records, setRecords] = useState([]);
  // const [roleFilter, setRoleFilter] = useState("");
  // const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleEdit = (user) => {
    setEditUserData(user);
    setSelectedUserId(user.users_id);
    setModalVisibility(true);
  };

  const closeModal = () => {
    setEditUserData(null);
    setSelectedUserId(null);
    setModalVisibility(false);
  };

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://aanganwadi-test.onrender.com/api/v1/user/get_users/0",
        {
          params: {
            page: currentPage,
            perPage: itemsPerPage,
          },
          headers: {
            Token: token,
          },
        }
      );

      const responseData = response.data.data;
      console.log(responseData);
      setData(responseData);
      // setRecords(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage, itemsPerPage, token]);

  useEffect(() => {
    fetchData(); // Call the function directly

    // Rest of your useEffect code
  }, [currentPage, itemsPerPage, token, fetchData]); // Add fetchData as a dependency

  const [count, setCount] = useState(1);

  const handleUpdate = async (updatedUserData) => {
    try {
      setCount(count + 1);

      // Assign the new ID to the updatedUserData
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

      // Close the modal after a successful update
      console.log(response);
      closeModal();
      fetchData();
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      // Send a POST request to the API for user deletion
      const response = await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/user/delete_user/${userId}`,
        null, // The request body is empty
        {
          headers: {
            Token: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Notify the user that the user has been deleted
        toast.success("User deleted successfully");
        

        // After deletion, you can refetch the data to update the user list
        fetchData();
      } else {
        console.error("Error deleting user:", response);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data.length / itemsPerPage);

  // const nPages = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  // const changePage = (page) => {
  //   console.log("Changing page to:", page);
  //   if (page < 0) {
  //     setCurrentPage(0);
  //   } else if (page >= totalPages) {
  //     setCurrentPage(totalPages - 1);
  //   } else {
  //     setCurrentPage(page);
  //   }
  // };
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(n) {
    setCurrentPage(n);
  }

  function nextPage() {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // const Filter = (event) => {
  //   const { value } = event.target;
  //   let filteredData = data.filter((f) => {
  //     const searchValue = value.toLowerCase();
  //     return (
  //       (f.name && f.name.toLowerCase().includes(searchValue)) ||
  //       (f.users_id &&
  //         f.users_id.toString().toLowerCase().includes(searchValue)) ||
  //       (f.email && f.email.toLowerCase().includes(searchValue)) ||
  //       (f.number && f.number.toLowerCase().includes(searchValue)) ||
  //       (f.users_role_id &&
  //         f.users_role_id.toLowerCase() === value.toLowerCase())
  //     );
  //   });

  //   if (value === "") {
  //     filteredData = data;
  //   }

  //   setRecords(filteredData);
  // };

  return (
    <>
      <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <div className="main-title">
          <h3>MANAGE USERS</h3>
        </div>

        {/* <div className="d-flex justify-content-end grid gap-3">
          <input
            className="search mb-3 rounded p-2"
            placeholder="Search...."
            onChange={Filter}
          />

          <select
            className="mb-3 rounded p-2 filter"
            onChange={(e) => {
              setRoleFilter(e.target.value);
              Filter(e); // Call the filter function when the select value changes
            }}
            name="role"
            value={roleFilter}
          >
            <option className="opt" value="">
              All
            </option>
            <option className="opt" value="Admin">
              Admin
            </option>
            <option className="opt" value="Employee">
              Employee
            </option>
          </select>
        </div> */}

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
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.users_id}</td>
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
              ))}
            </tbody>
          </Table>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="{#}" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a href="{#}" className="page-link" onClick={() => changePage(n)}>
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="{#}" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </main>
      <Modal show={isModalVisible} onClose={closeModal}>
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
            <button className="btn btn-primary m-1" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageUser;