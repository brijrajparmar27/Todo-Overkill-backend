const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: {
      required: true,
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy:{
      type: String,
      require: true
    },
    folderId:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);
