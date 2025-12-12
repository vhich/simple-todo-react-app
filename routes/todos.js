import todoModel from "../todo_model/todo.js";
import { Router } from "express";

const router = Router();

// Handle create todo list
router.post("/", async (req, res) => {
  try {
    const todo = new todoModel(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Handle get all todo list
router.get("/", async (req, res) => {
  try {
    const response = await todoModel.find();
    res.json(response);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error creating todo", error: err.message });
  }
});

// Handle to get a single todo list
router.get("/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const todo = await todoModel.findById(todoId);
    if (!todo) {
      const error = new Error(`Post with the id of ${todoId} was not found`);
      return next(error);
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error getting todo", error: err.message });
  }
});

// Handle update todo list
router.put("/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const updates = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(todoId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) {
      const error = new Error(`Todo with the id of ${todoId} was not found`);
      return next(error);
    }
    res.status(200).json(updatedTodo);
    console.log(`todo with the id of ${todoId} is updated successfully!`);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error getting todo", error: err.message });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await todoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      const error = new Error(`Todo with the id of ${todoId} was not found`);
      return next(error);
    }
    res.status(200).json(deletedTodo);
    console.log(`todo with the id of ${todoId} is deleted successfully!`);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error deleting todo", error: err });
  }
});

export default router;
