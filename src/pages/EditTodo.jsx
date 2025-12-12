import React from "react";
import { useParams, useLoaderData, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaAsterisk, FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

const EditTodo = ({ updateTodo }) => {
  const todo = useLoaderData();

  const [title, setTitle] = useState(todo.title);
  const [category, setCategory] = useState(todo.category);
  const [description, setDescription] = useState(todo.description);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = {
      id,
      title,
      description,
      category,
      createdAt: `Updated: ${new Date().toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}`,
    };
    updateTodo(updatedTodo);
    toast.success("Todo updated successfully!");
    return navigate(`/`);
  };

  return (
    <>
      <div className="flex justify-center my-2.5">
        <button onClick={handleGoBack} className="text-blue-600">
          <FaArrowLeft className="inline mb-0.5 mx-1" />
          Go Back
        </button>
      </div>

      <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md my-6 rounded border-t-4 border-t-blue-600 form-wrapper">
        <h1 className="text-2xl font-bold mb-6">Update Todo</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
              <FaAsterisk className="inline text-red-400 text-0.3xl ml-2 mb-0.2" />
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter todo title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              className="border rounded w-full py-2 px-3"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
              <FaAsterisk className="inline text-red-400 text-0.3xl ml-2 mb-0.2" />
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter todo description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTodo;
