
import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from './../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
  const token=window.localStorage.getItem('token');
    // const { user, isLoading } = useAuth();
    let location = useLocation();
    // if (token=null) { return <CircularProgress /> }
    if (token) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;