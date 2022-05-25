const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, required: true, default: false },
});

const dashboardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  todos: [todoSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
//password: { type: String, required: true, unique: true },
  dashboards: [dashboardSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User
