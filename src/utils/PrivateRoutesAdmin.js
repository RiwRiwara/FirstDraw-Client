import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRouteAdmin = () => {
    const auth = localStorage.getItem('user');
    const user = JSON.parse(auth);
    
    return user && user.data && user.data.isAdmin ? <Outlet /> : <Navigate to="/permission" />;
}

export default PrivateRouteAdmin;
