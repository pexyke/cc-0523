const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, // a FE localhost kell ide
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // body-ban erkezo json-t parse-olni tudja
app.use([logger]); // use this middleware on every request

const dashboardRouter = require("./route/dashboard");
app.use("/api/dashboards", dashboardRouter);

app.use(errorHandler);

module.exports = app;

/*
app.get("/api/public", (req, res) => {
  console.log("public");
  res.send("hello template public");
});
app.get("/api/private", auth({ block: true }), (req, res) => {
  console.log("private");
  res.send(`hello template private, your id is ${res.locals.userid}`);
});
app.get("/api/prublic", auth({ block: false }), (req, res) => {
  if (!res.locals.userid) return res.send("hello world prublic");
  res.send(`hello template prublic, your id is ${res.locals.userid}`);
});
*/