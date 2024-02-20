const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});

// Person routes
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// Menu Router
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log("Server is running on Port", port);
});
