const folderModel = require("../models/folderModel");
const todoModel = require("../models/todoModel");

const getAllFolders = async (req, res) => {
  const userId = req.userId._id;
  const { search } = req.query;
  const regex = new RegExp(`.*${search}.*`, "i");
  const folderList = await folderModel.find({
    createdBy: userId,
    name: { $regex: regex },
  });
  res.status(200).json(folderList);
};

const deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  const { search } = req.query;
  const userId = req.userId._id;
  console.log(search);
  const regex = new RegExp(`.*${search}.*`, "i");
  await todoModel.deleteMany({ createdBy: userId, folderId: folderId });
  await folderModel.deleteOne({
    _id: folderId,
    createdBy: userId,
  });
  const remainingFolderList = await folderModel.find({
    createdBy: userId,
    name: { $regex: regex },
  });
  res.status(200).json(remainingFolderList);
};

const createFolder = async (req, res) => {
  const userId = req.userId._id;
  const { name } = req.body;
  const regex = new RegExp(`.*${name}.*`, "i");

  await folderModel.create({
    createdBy: userId,
    name: name,
  });
  const folderList = await folderModel.find({
    createdBy: userId,
    name: { $regex: regex },
  });
  res.status(200).json(folderList);
};

module.exports = {
  getAllFolders,
  deleteFolder,
  createFolder,
};
