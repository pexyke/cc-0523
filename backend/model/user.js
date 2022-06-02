const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // empty string NONO!
  content: { type: String, required: true }, // empty string is enough
  isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
  title: { type: String, required: true }, // empty string NONO!
  todos: [todoSchema], // empty list is default?
});

const userSchema = new mongoose.Schema({
  username: { type: String }, // empty string NONO!
  // email: { type: String, unique: true, required: true }, // empty string NONO! + validation
  providers: {
    google: { type: String, required: false, unique: true },
    facebook: { type: String, required: false, unique: true },
  },
  dashboards: [dashboardSchema], // empty list is default?
});

const User = mongoose.model("user", userSchema);
module.exports = User;

/*
todos: { type: todoSchema, default: () => [] }, // empty list is default?
*/