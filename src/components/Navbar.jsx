import React from "react";
import { FaPlus, FaMoon } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to={"/"} className="text-white text-2xl font-bold a-link">
          MiTodo
        </Link>
        <Link
          to={"/create-todo"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus className="inline mx-1 mb-1" />
          Add
        </Link>

        <button
          className="text-white py-1.5 px-4 rounded border-2 border-amber-100"
          onClick={toggleDarkMode}
        >
          <FaMoon className="inline mb-1 mr-2" />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
