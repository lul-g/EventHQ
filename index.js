// start up server on sign up/in page
// --serve -  conn
// const open = require("open");
const express = require("express");
const fs = require("fs");
const client = require("./conn/connect_db.js").client;
const port = process.env.PORT || 5000;
const app = express();

var database = null;
app.use(express.static("pages"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth/signup", (req, res) => {
  res.status(200).send(fs.readFileSync("./pages/auth/signup.html", "utf-8"));
});

app.post("/auth/signup", (req, res) => {
  console.log(req.body);
  database
    .collection("users")
    .find({ email: req.body.email }, { email: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      if (result.length > 0)
        res.status(406).json({ message: "User already exists" });
      else {
        req.body.password = bcrypt
          .hashSync(req.body.password, salt)
          .replace(`${salt}.`, "");
        database
          .collection("users")
          .insertOne(req.body, function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "User created" });
          });
      }
    });
});

app.listen(port);

client.connect(function (err, db) {
  if (err) throw err;
  console.log("Connected to database");

  database = db.db("EventHQ");
  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    await open(`http://localhost:${port}`);
  });
});
