import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if the user is authenticated (replace with your authentication logic)
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
