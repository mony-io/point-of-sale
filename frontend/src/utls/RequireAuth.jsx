import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
const RequireAuth = () => {
    return localStorage.getItem('isAdmin') ? <Outlet /> : <Navigate to="*" />;
}

export default RequireAuth
