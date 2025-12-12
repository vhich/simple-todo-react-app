import React, { Suspense } from "react";
import { useParams, useLoaderData, useNavigate, Link } from "react-router-dom";
import { FaPen, FaTrash, FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

const SingleTodo = ({ deleteTodo }) => {
  const todo = useLoaderData();

  const { id } = useParams();
  const navigate = useNavigate();

  const onDeleteClick = (todoId) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this todo?`
    );
    if (!confirm) return;

    deleteTodo(todoId);
    toast.success("Todo deleted!");
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };
  const dateObject = new Date(todo.createdAt);

  // 2. Apply Formatting
  const formattedDate = dateObject.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
  });

  return (
    <Suspense fallback={<h1>Loading Posts...</h1>}>
      <div className="container my-6 mx-auto">
        <div className="flex justify-end my-2.5">
          <button onClick={handleGoBack} className="text-blue-600">
            <FaArrowLeft className="inline mb-0.5 mx-1" />
            Home
          </button>
        </div>

        <header className="todo-and-category">
          {todo.category === "Business" ? (
            <small className="inline bg-blue-500 text-amber-100 py-0.5 px-1.5 rounded">
              {todo.category}
            </small>
          ) : (
            <small className="inline bg-pink-500 text-amber-100 py-0.5 px-1.5 rounded">
              {todo.category}
            </small>
          )}
          <h1 className="text-3xl font-bold uppercase">{todo.title}</h1>
        </header>

        <small className="text-gray-500">{formattedDate}</small>
        <p className="my-4 text-gray-600">{todo.description}</p>
        <div className="flex gap-6 my-8">
          <Link
            to={`/edit-todo/${todo._id}`}
            className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FaPen className="inline mb-1 mr-1.5" />
            Edit
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => onDeleteClick(todo._id)}
          >
            <FaTrash className="inline mb-1 mr-1.5" />
            Delete
          </button>
        </div>
      </div>
    </Suspense>
  );
};

const todoLoader = async ({ params }) => {
  try {
    const apiUrl = `http://localhost:3001/api/todos`;
    const res = await fetch(`${apiUrl}/${params.id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data", error);
  }
};

export { SingleTodo as default, todoLoader };
