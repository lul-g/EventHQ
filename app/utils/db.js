const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.DB_URL;

async function connectToDb() {
  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = { connectToDb };
