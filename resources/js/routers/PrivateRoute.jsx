// PrivateRoutes.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const isAuthenticated = () => {
  const auth = localStorage.getItem('token');
  return auth !== null && auth !== undefined;
};

const PrivateRoute = ({ component: Component, isAuthenticated: isAuthRequired, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthRequired && !isAuthenticated() ? <Navigate to="/login" replace /> : <Component />}
    />
  );
};

export default PrivateRoute;
