import React from "react";
import { useState, useEffect } from "react";
import TodoList from "../components/TodoList";

const TodosList = ({ deleteTodo }) => {
  const apiUrl = "http://localhost:3001/api/todos";
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Cache-control": "no-cache",
        },
      });
      const data = await res.json();
      data.reverse();
      setTodos(data);
    } catch (error) {
      console.log("Internal server error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodos();
    return undefined;
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="container mx-auto mt-6">
          <h3 className="text-xl text-gray-500 todos-length">
            You've got {todos.length} todo list
          </h3>
          <div className="flex align-middle mt-7 select-view-type">
            <p>Select view type:</p>
            <button
              className={`mx-4 ${
                !isGrid
                  ? "border-2  border-gray-500  text-white"
                  : "bg-gray-600 text-white"
              }  px-4 rounded`}
              onClick={() => setIsGrid(true)}
            >
              Grid
            </button>
            <button
              className={`mx-4 ${
                isGrid
                  ? "border-2  border-gray-500  text-white"
                  : "bg-gray-600 text-white"
              }  px-4 rounded`}
              onClick={() => setIsGrid(false)}
            >
              List
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <h3 className="text-center my-3">Loading todo list...</h3>
      ) : (
        <ul
          className={`my-6 container mx-auto grid gap-3 transition ${
            isGrid ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {todos.map((todo) => (
            <TodoList
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              fetchTodos={fetchTodos}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodosList;
