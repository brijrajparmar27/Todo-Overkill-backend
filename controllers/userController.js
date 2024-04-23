const folderModel = require("../models/folderModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const jwt = createToken(user._id);
    res.status(200).json({
      email: user.email,
      username: user.username,
      _id: user._id,
      token: jwt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    let user = await userModel.signup(email, password, username);
    await folderModel.create({
      createdBy: user._id,
      name: "Default",
      isDefault: true,
    });
    const jwt = createToken(user._id);
    res.status(200).json({
      email: user.email,
      username: user.username,
      _id: user._id,
      token: jwt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  login,
  signup,
};
