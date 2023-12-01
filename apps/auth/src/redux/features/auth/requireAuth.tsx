import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectAccessToken } from './authSlice'; // Replace with the actual path to your authentication slice

const RequireAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector(selectAccessToken);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setIsLoading(false);
    }
  }, [token]); // The empty dependency array ensures that this effect runs once when the component mounts

  if (isLoading) {
    // If the token is still loading, you might want to render a loading indicator
    return <div>Loading...</div>;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
