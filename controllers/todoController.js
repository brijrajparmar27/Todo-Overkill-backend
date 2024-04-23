const todoModel = require("../models/todoModel");

const addTodo = async (req, res) => {
  const body = req.body;
  const userId = req.userId._id;
  await todoModel.create({
    text: body.text,
    folderId: body.folderId,
    createdBy: userId,
  });
  let todos = await todoModel.find({
    folderId: body.folderId,
    createdBy: userId,
    completed: false,
  });
  res.json(todos);
};
const getTodos = async (req, res) => {
  const { status, folder } = req.query;
  let data = {};
  const userId = req.userId._id;
  let queryConstraints = {
    createdBy: userId,
    folderId: folder,
  };
  if (["completed", "pending"].includes(status)) {
    queryConstraints.completed = status === "completed";
    data[status] = await todoModel.find(queryConstraints);
  } else {
    data["pending"] = await todoModel.find({
      ...queryConstraints,
      completed: false,
    });
    data["completed"] = await todoModel.find({
      ...queryConstraints,
      completed: true,
    });
  }
  res.json(data);
};
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todos = await todoModel.findByIdAndDelete(id);
  if (!todos) {
    return res.status(400).json({ error: "such todo doesnt exist" });
  }
  const userId = req.userId._id;
  const appTodos = await todoModel.find({
    completed: todos.completed,
    createdBy: userId,
    folderId: todos.folderId,
  });
  res.json({ areCompleted: todos.completed, todos: appTodos });
};
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todos = await todoModel.findByIdAndUpdate(id, {
    completed,
  });
  res.json(todos);
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
