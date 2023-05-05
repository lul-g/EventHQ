const config = require("../config/config");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = config.dbUrl;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = { MongoClient, ServerApiVersion, uri, client };
