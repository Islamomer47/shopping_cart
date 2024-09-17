import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST", // Use POST for logout
        credentials: "include", // Include credentials (cookies)
      });

      if (!response.ok) {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and navigate to login in all cases
      localStorage.clear();
      navigate("/login");
    }
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
