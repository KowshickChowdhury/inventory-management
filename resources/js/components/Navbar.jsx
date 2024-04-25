import React, { useState } from 'react';

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggleNav = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <nav className="border-gray-200 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold my-4">Inventory Management</div>
        <div className="my-4">
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={handleToggleNav}
          >
            {showNavLinks ? "Close" : "Menu"}
          </button>
          <div className={`md:flex ${showNavLinks ? "block" : "hidden"}`}>
            <a href="/dashboard" className="text-white mx-4">
              Dashboard
            </a>
            <a href="/profile" className="text-white mx-4">
              Profile
            </a>
            <button onClick={handleLogout} className="text-white mx-4">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
