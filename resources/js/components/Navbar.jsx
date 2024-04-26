import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AuthApis from '../apis/AuthApis';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = AuthApis.logout();
            if (res) {
                localStorage.removeItem('email');
                localStorage.removeItem('name');
                localStorage.removeItem('token');
                navigate('/login')

            }
      }
    });
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
            <a href="/" className="text-white mx-4">
              Dashboard
            </a>
            <a href="/category" className="text-white mx-4">
              Category
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
