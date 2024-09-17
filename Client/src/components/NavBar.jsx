import React from "react";
import { useNavigate } from "react-router-dom";

// Helper function to clear cookies
const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0];
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });
};

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and cookies
    localStorage.clear();
    clearCookies();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My Shopping App</div>
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
