const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  try {
    let { _id } = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const requestUserId = await userModel.findOne({ _id }).select("_id");
    if (!requestUserId) {
      res.status(401).json({ error: "User does not exits" });
    }
    req.userId = requestUserId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized request" });
  }
};

module.exports = {
  requireAuth,
};
