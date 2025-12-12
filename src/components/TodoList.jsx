import React from "react";
import { FaTrash, FaPen } from "react-icons/fa6";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const TodoList = ({ todo, deleteTodo, fetchTodos }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true" ? true : false;
  });
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setDarkMode(!darkMode);
  }, []);
  const navigate = useNavigate();
  const onDeleteClick = (todoId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirm) {
      return;
    }

    deleteTodo(todoId);
    setIsDeleted(!isDeleted);
    toast.success("Todo deleted!");
  };
  if (isDeleted) {
    fetchTodos();
  }
  let description = todo.description;

  const dateObject = new Date(todo.createdAt);

  // 2. Apply Formatting
  const formattedDate = dateObject.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
  });
  return (
    <>
      <li
        className="p-4 rounded-2xl drop-shadow-2xl shadow-md border-t-4 border-t-gray-200 todo-list-item"
        id={todo.id}
      >
        <button
          className="float-right text-gray-600 mt-2 hover:text-gray-700"
          title="Delete"
          onClick={() => onDeleteClick(todo._id)}
        >
          <FaTrash />
        </button>
        <Link
          to={`/edit-todo/${todo._id}`}
          className="float-right mr-5 mt-2 text-gray-600 hover:text-gray-700"
          title="Edit"
        >
          <FaPen />
        </Link>
        <header className=" todo-and-category">
          {todo.category === "Business" ? (
            <small className="inline-block bg-blue-500 text-amber-100 py-0.5 px-1.5 rounded">
              {todo.category}
            </small>
          ) : (
            <small className="inline-block bg-pink-500 text-amber-100 py-0.5 px-1.5 rounded">
              {todo.category}
            </small>
          )}
          <h1 className="text-2xl font-bold">
            {todo.title.length > 35
              ? todo.title.slice(0, 28) + "..."
              : todo.title}
          </h1>
        </header>

        <p className="my-2 text-gray-800">
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>
        <small className="block text-gray-400">
          {todo.createdAt ? formattedDate : formattedDate}.
        </small>
        <Link
          to={`/todo/${todo._id}`}
          className="text-blue-500 bg-blue-200 font-bold rounded py-1 px-4 transition my-2 inline-block hover:text-blue-700 hover:bg-blue-400"
        >
          See all
        </Link>
      </li>
    </>
  );
};

export default TodoList;
