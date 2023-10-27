import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useCallback } from 'react';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";



const AddCategory = ({ setIsLoading, setIsLoggedIn }) => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);



  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);

  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);

  };


  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };
  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };
    

  const [formData, setFormData] = useState({
    category_name: '',
  });
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setSelectedCategory({
      ...selectedCategory,
      [name]: value,
    });
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
      console.log(responseData)
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


  const handleEditCategory = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      return; // Handle the case where no category is selected for editing
    }

    try {
      const response = await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/inventory/edit_category/${selectedCategory.category_id}`,
        {
          category_name: selectedCategory.category_name, // Set the category_name from selectedCategory
        },
        {
          headers: {
            Token: token,
          },
        }
      );

      // Update the category list with the edited data
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.category_id === selectedCategory.category_id ? response.data : category
        )
      );

      toast.success('Category updated successfully');
      closeEditModal();
      fetchData();
    } catch (error) {
      console.error('Category update failed:', error);
      toast.error('Category update failed');
    }
  };





  const handleDeleteCategory = async (categoryID) => {
    // if (!window.confirm("Are you sure you want to delete this category?")) {
    //   return;
    // }
  
    try {
      await axios.post(
        `https://aanganwadi-test.onrender.com/api/v1/inventory/delete_category/${categoryID}`,
        null, // No request data needed for deletion
        {
          headers: {
            Token: token,
          },
        }
      );
  
      // Update the category list by removing the deleted category
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.category_id !== categoryID)
      );
      fetchData();
      closeDeleteModal();
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Category deletion failed:', error);
      toast.error('Category deletion failed');
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
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <Button
                        className="btn-sm btn-danger"
                        onClick={() => openDeleteModal(category)}
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
          <form onSubmit={handleEditCategory}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                name="category_name"
                className="form-control"
                value={selectedCategory ? selectedCategory.category_name : ''}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete this category?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeDeleteModal}>
      Cancel
    </Button>
    <Button variant="danger" onClick={() => handleDeleteCategory(categoryToDelete.category_id)}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </>

  );
};

export default AddCategory;
