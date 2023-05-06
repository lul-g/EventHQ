const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const config = require("../config/config");
const uri = config.dbUrl;

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
