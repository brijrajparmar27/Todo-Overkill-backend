const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

userSchema.statics.signup = async function (email, password, username) {
  let exists = await this.findOne({ email });
  if (!(email || password || username)) throw Error("Feilds cannot be empty.");
  if (exists) throw Error("Email already exists.");

  let salt = await bcrypt.genSalt(10);
  let encryptedPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: email,
    password: encryptedPass,
    username: username,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!(email || password)) {
    throw Error("Feilds cannot be empty");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("No such user Exists");
  }
  let match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Credentials");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
