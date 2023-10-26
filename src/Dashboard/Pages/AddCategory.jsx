import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import { Table, Button , Modal } from "react-bootstrap";
import { useCallback } from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";


const AddCategory = ({ setIsLoading , setIsLoggedIn}) => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editFormData, setEditFormData] = useState({ category_name: '' });
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [categoryToDelete, setCategoryToDelete] = useState(null);

const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle);
}

const openEditModal = (category) => {
  setEditFormData(category);
  setIsEditModalOpen(true);
};

const closeEditModal = () => {
  setIsEditModalOpen(false);
  setEditFormData({ category_name: '' });
};

const handleDelete = (categoryId) => {
  const categoryToDelete = categories.find((category) => category.id === categoryId);
  setCategoryToDelete(categoryToDelete);
  setShowDeleteModal(true);
};


  const [formData, setFormData] = useState({
    category_name: '',
  });
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://aanganwadi-test.onrender.com/api/v1/inventory/add_category',
        formData,
        {
          headers: {
            Token: token,
          },
        }
      );

      const newCategory = response.data; // Assuming the response contains the added category
      setCategories([...categories, newCategory]);
      setFormData({ category_name: '' });
      console.log(newCategory);
      fetchData();
      toast.success('Category added successfully');
    } catch (error) {
      console.error('Category addition failed:', error);
      toast.error('Category addition failed');
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://aanganwadi-test.onrender.com/api/v1/inventory/get_category",
        {
          headers: {
            Token: token,
          },
        }
      );
      const responseData = response.data.data;
      setCategories(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, token]);

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, [token, fetchData]);

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(`https://aanganwadi-test.onrender.com/api/v1/inventory/delete_category/${categoryToDelete.id}`, {
        headers: {
          Token: token,
        },
      });
  
      // Remove the deleted category from the categories list
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryToDelete.id));
  
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Category deletion failed:', error);
      toast.error('Category deletion failed');
    }
  
    setShowDeleteModal(false);
  };
  

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/inventory/edit_category/${editFormData.id}`,
        editFormData,
        {
          headers: {
            Token: token,
          },
        }
      );
        console.log(response);
      // Update the category list with the updated data
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editFormData.id ? response.data : category
        )
      );
  
      toast.success('Category updated successfully');
      closeEditModal();
    } catch (error) {
      console.error('Category update failed:', error);
      toast.error('Category update failed');
    }
  };
  

  return (
    <>
    <Header OpenSidebar={OpenSidebar} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    <main className="main-container">
      <div className="custom-container">
        <div className="p-5 mb-4 ml-3 bg-light rounded-3 custom-form">
          <h2>Add Category</h2>
          <form onSubmit={handleAddCategory}>
            <div className="mb-3 mt-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                name="category_name"
                className="form-control"
                value={formData.category_name}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary">Add Category</button>
          </form>
        </div>
        <div className="table-responsive">
          <Table responsive className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <Button
                      className="btn-sm btn-danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="btn-sm btn-primary m-2"
                      onClick={() => openEditModal(category)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </main>

<Modal show={isEditModalOpen} onHide={closeEditModal}>
<Modal.Header closeButton>
  <Modal.Title>Edit Category</Modal.Title>
</Modal.Header>
<Modal.Body>
  <form onSubmit={handleUpdateCategory}>
    <div className="mb-3">
      <label className="form-label">Category Name</label>
      <input
        type="text"
        name="category_name"
        className="form-control"
        value={editFormData.category_name}
        onChange={(e) =>
          setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
          })
        }
        />
    </div>
    <Button type="submit" variant="primary">
      Update
    </Button>
  </form>
</Modal.Body>
</Modal>
<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete the category: {categoryToDelete ? categoryToDelete.category_name : ''}?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={confirmDeleteCategory}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

        </>

  );
};

export default AddCategory;
