const express = require("express");
const fs = require("fs");
const client = require("./conn/setupDB.js").client;
const port = process.env.PORT || 5005;
const app = express();
const bcrypt = require("bcrypt");

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

    if (result.length === 0) {
      // Email is not in the database, so insert it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const reponse_insert = await collection.insertOne({ email: req.body.email, password: hashedPassword });
      console.log(`reponse_insert: ${reponse_insert.insertedId}`)
      console.log(`Inserted email: ${req.body.email}`);
    } else {
      console.log(`Email already exists: ${req.body.email}`);
    }
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
}