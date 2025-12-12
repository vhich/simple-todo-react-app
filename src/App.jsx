import React from "react";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import TodosList from "./pages/TodosList";
import MainLayouts from "./Layouts/MainLayouts";
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import SingleTodo, { todoLoader } from "./pages/SingleTodo";
import NotFound from "./pages/NotFound";

const App = () => {
  const apiUrl = "http://localhost:3001/api/todos";
  // Create a todo
  const addTodo = async (newTodo) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(newTodo),
      });
    } catch (error) {
      console.log("Error creating todo", error);
    }
    return;
  };
  //Update a todo list
  const updateTodo = async (todo) => {
    try {
      const res = await fetch(`${apiUrl}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(todo),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<TodosList deleteTodo={deleteTodo} />} />
        <Route
          path="/create-todo"
          element={<CreateTodo addNewTodo={addTodo} />}
        />
        <Route
          path="/edit-todo/:id"
          element={<EditTodo updateTodo={updateTodo} />}
          loader={todoLoader}
        />
        <Route
          path="/todo/:id"
          element={<SingleTodo deleteTodo={deleteTodo} />}
          loader={todoLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
