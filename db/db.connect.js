const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;

async function initializeDatabase() {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to Database Successfully."))
    .catch((error) =>
      console.log("Found error while connecting to database: ", error)
    );
}

module.exports = { initializeDatabase };
