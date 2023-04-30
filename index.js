const express = require("express");
const fs = require("fs");
const client = require("./conn/setupDB.js").client;
const port = process.env.PORT || 5005;
const app = express();

app.use(express.json());
app.use(express.static("pages"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth/signup", (req, res) => {
  res.status(200).send(fs.readFileSync("./pages/auth/signup.html", "utf-8"));
});

app.post("/auth/signup", (req, res) => {
  auth_signup(req, res);
});

app.listen(port);

async function auth_signup(req, res) {
  try {
    await client.connect();
    console.log(`Request Body: ${req.body}`);

    const database = client.db("EventHQ");
		const collection = database.collection("users");

    const query = { email: req.body.email };
    console.log(`Query: ${req.body.email}`);
		const result = await collection.find(query).toArray();
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
}