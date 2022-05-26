const User = require("../model/user");

const allDashboards = async (req, res) => {
  // needs auth mw. with block
  // find user with userId res.locals.userId
  // return user dashboards

  const user = await User.findById(res.locals.userid);
  res.json({ user }); // = {user: user}
  // vagy inkabb user.dashboards megy vissza
};

// const dashboardById = async (req, res) => {
//   const dashboard = await User.dashboards.id(req.params.id);
//   res.json({ dashboard });
// };

// const allTodos = async (req, res) => {
//   const todos = await User.dashboards.id(req.params.id).todos;
//   res.json({ todos });
// };

// const todoById = async (req, res) => {
//   const todo = await User.dashboards.id(req.params.id).todos.id(req.params.todoId);
//   res.json({ todo });
// };

exports.allDashboards = allDashboards;