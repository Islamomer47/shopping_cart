const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

exports.registerUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userModel.createUser(username, hashedPassword, role);
};

exports.loginUser = async (username, password) => {
  const user = await userModel.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid username or password");
  }
  return user;
};
