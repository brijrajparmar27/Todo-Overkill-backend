const {
  getAllFolders,
  createFolder,
  deleteFolder,
} = require("../controllers/folderController");
const { requireAuth } = require("../middlewares/requireAurth");

const folderRouter = require("express").Router();

folderRouter.use(requireAuth);

folderRouter.get("/", getAllFolders);
folderRouter.post("/add", createFolder);
folderRouter.delete("/:folderId", deleteFolder);

module.exports = folderRouter;
