import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
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