import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todos from "./routes/todos.js";
import errorHandler from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 3000;
// mongodb+srv://vhictor1999:vhictor1999april@cluster0.rmukhwk.mongodb.net/?appName=Cluster0
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// connect mongoose
mongoose
  .connect(
    "mongodb+srv://vhictor1999:vhictor1999april@cluster0.rmukhwk.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(console.error());

// Routes
app.use("/api/todos", todos);

//   middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
