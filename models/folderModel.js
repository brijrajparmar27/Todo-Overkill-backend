const mongoose = require("mongoose");

const folderSchema = mongoose.Schema({
  createdBy: {
    require: true,
    type: String,
  },
  name: {
    require: true,
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("folder", folderSchema);
