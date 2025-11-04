import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connection from "./config/db.js";
import Todo from "./models/todoModel.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connection();

app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

app.post("/todo", async (req, res) => {
  try {
    const { task, isCompleted } = req.body;

    const todo = new Todo({
      task,
      isCompleted,
    });

    const saveTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: saveTodo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating todo",
      error: err.message,
    });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.isCompleted = !todo.isCompleted;
    todo.save();

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error.message,
    });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findTodo = await Todo.findById(id);
    if (!findTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
});

export default app;
