const folderRouter = require("./routes/folderRoutes");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRouter");

const rootRouter = require("express").Router();

rootRouter.use("/todo", todoRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/folder", folderRouter);

module.exports = rootRouter;
