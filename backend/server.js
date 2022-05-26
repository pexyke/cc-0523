require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Template is listening on port ${port}. Run: "brew services start mongodb-community"`);
});