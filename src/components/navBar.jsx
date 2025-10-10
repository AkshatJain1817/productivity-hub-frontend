import React from "react";

function NavBar() {
  return (
    <nav>
        <div>
            <h1 className="text-2xl font-bold p-4 bg-gray-900 text-white">productivity hub</h1>
        </div>
        <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
            <li>
                <a href="/tasks" onClick={(e) => {
                    e.preventDefault();
                    // Logic to navigate to tasks page
                }}>
                    Tasks
                </a>
            </li>
            <li>
                <a href="/calander" onClick={(e) => {
                    e.preventDefault();
                    // Logic to navigate to tasks page
                }}>
                    Calander
                </a>
            </li>
            <li>
                <a href="/summary" onClick={(e) => {
                    e.preventDefault();
                    // Logic to navigate to tasks page
                }}>
                    Summary
                </a>
            </li>
        </ul>
        <button className="bg-red-500 text-white px-4 py-2 m-4 rounded" onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
        }}>
            Logout
        </button>
    </nav>
  );
}

export default NavBar;