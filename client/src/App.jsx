import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import { useUser } from "./context/UserContext";
import { Outlet } from 'react-router-dom';

const App = () => {
  const { user, login } = useUser();
  const handleLogin = (username, id, token) => {
    login(username, id, token);
  };

  return (
    <div>
      {user.isLoggedIn ? (
        <div className="w-full p-6">
        <Navbar />
        <Outlet />
      </div>
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;