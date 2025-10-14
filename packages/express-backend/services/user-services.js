// packages/express-backend/services/user-services.js
import mongoose from "mongoose";
import userModel from "../models/user.js"; // <-- ensure correct path + .js

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .catch((error) => console.log(error));

function getUsers(name, job) {
  if (!name && !job)          return userModel.find();          // all
  if (name && job)            return userModel.find({ name, job }); // BOTH
  if (name && !job)           return findUserByName(name);      // name only
  /* if (job && !name) */     return findUserByJob(job);        // job only
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name });
}

function findUserByJob(job) {
  return userModel.find({ job });
}

// NEW: needed for DELETE /users/:id
function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};
