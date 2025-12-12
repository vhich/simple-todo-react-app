import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAsterisk, FaArrowLeft } from "react-icons/fa6";
// import { format } from "date-fns";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function CreateTodo({ addNewTodo }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Business");
  const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();
  const handleGoBack = () => {
    window.history.back();
  };
  let i = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      category,
      createdAt: new Date(),
    };
    addNewTodo(newTodo);
    toast.success("You've added a new todo, successfully!");
    return navigate("/");
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
        <h1 className="text-2xl font-bold mb-4">Create Todo</h1>
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
          {/* <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="datePicker"
            >
              Date
            </label>
            <div className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-hidden">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                id="datePicker"
                className="outline-none border-none date-picker block"
              />
            </div>
          </div> */}
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
            Create Todo
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateTodo;
