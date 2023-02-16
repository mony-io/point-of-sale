import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
const RequireAuth = () => {
    const auth = useAuth();
    return auth.isAdmin ? <Outlet /> : <Navigate to="*" />;
}

export default RequireAuth
