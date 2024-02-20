const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

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
