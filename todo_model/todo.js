import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const todoModel = model("todos", todoSchema);

export { todoSchema, todoModel };
export default todoModel;
