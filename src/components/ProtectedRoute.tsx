import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ 
  allowedRole, 
  userRole 
}: { 
  allowedRole: 'student' | 'organizer'; 
  userRole: 'student' | 'organizer' | null;
}) => {
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={userRole === 'organizer' ? '/organizer/dashboard' : '/student/feed'} replace />;
  }

  return <Outlet />;
};
