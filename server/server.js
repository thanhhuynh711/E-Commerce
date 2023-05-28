const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ express: true }));
dbConnect();

initRoutes(app);
app.listen(port, () => {
  console.log("Server funning on the port:" + port);
});
