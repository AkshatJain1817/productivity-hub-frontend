import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      {/* Top section - logo/title */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white tracking-wide cursor-pointer hover:text-indigo-400 transition-colors"
        >
          Productivity Hub 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Bottom section - navigation links */}
      <ul className="flex flex-wrap items-center justify-center space-x-6 bg-gray-800 py-3 text-gray-300">
        <li>
          <button
            onClick={() => navigate("/")}
            className="hover:text-white hover:underline transition-colors"
          >
            Tasks
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/calendar")}
            className="hover:text-white hover:underline transition-colors"
          >
            Calendar
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/emailGenerator")}
            className="hover:text-white hover:underline transition-colors"
          >
            Email Generator
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
