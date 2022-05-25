require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");
//const businessLogic = require("./middleware/businessLogic");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/TEST', {
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});


const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.APP_URL }));
app.use(express.json());

app.use([logger]);

app.get("/api/public", (req, res) => {
  res.send("public");
});

app.get("/api/private", auth({ block: true }), (req, res) => {
  res.send(`Hello registered user ${res.locals.userId}`);
});

app.get("/api/privateandpublic", auth({ block: false }), (req, res) => {
  if (!res.locals.userId) return res.send("Hello unkown");
  res.send(`hello, your id is: ${res.locals.userId}`);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
