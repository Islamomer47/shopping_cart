const userModel = require("../models/userModel");

exports.getAllUsers = async () => {
  return await userModel.getAllUsers();
};

exports.getUserById = async (id) => {
  return await userModel.getUserById(id);
};

exports.updateUser = async (id, userData) => {
  return await userModel.updateUser(id, userData.username, userData.role);
};

exports.deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};
