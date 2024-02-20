const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;

// set connection
mongoose.connect(mongoURL, {
  // These Parameters are required
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Conected to mongoDB server");
});
db.on("disconnected", () => {
  console.log("Disconected to mongoDB server");
});
db.on("error", () => {
  console.log("Error to mongoDB server");
});

// Export database connection

module.exports = db;
