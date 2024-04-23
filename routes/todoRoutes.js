const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const { requireAuth } = require("../middlewares/requireAurth");

const todoRouter = require("express").Router();

todoRouter.use(requireAuth)

todoRouter.get("/", getTodos);

todoRouter.post("/", addTodo);

todoRouter.patch("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

module.exports = todoRouter;
