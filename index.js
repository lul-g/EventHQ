const express = require("express");
const open = require("open");
const fs = require("fs");
const client = require("./conn/setupDB.js").client;
const port = process.env.PORT || 5005;
const app = express();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const jwt_expiration = 86400000;
const jwtsalt = "privatekey";

const salt = "$2b$10$Imnq7Q2r0RS7DqaKV0rpPe";

app.use(express.json());
app.use(express.static("pages"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:user", async (req, res) => {
  //   userId = await checkUser(req.cookies["jwt"]);
  res.status(200).send(fs.readFileSync("./pages/private.html", "utf-8"));
});

app.get("/auth/signup", (req, res) => {
  res.status(200).send(fs.readFileSync("./pages/auth/sign_up.html", "utf-8"));
});
app.get("/auth/signin", (req, res) => {
  res.status(200).send(fs.readFileSync("./pages/auth/sign_in.html", "utf-8"));
});

// API
// app.get("/api/user", authenticateToken, (req, res) => {
//   res.json({ email: req.user.email });
// });

// HANDLE CLIENT REQUEST
app.post("/auth/signup", (req, res) => {
  auth_signup(req, res);
});

app.post("/auth/signin", (req, res) => {
  auth_signin(req, res);
});

app.listen(port, async () => {
  console.log(`EventHQ served: http://localhost:${port}/auth/signup`);
  await open(`http://localhost:${port}/auth/signup`);
});

async function auth_signup(req, res) {
  try {
    await client.connect();

    const database = client.db("EventHQ");
    const collection = database.collection("users");

    const query = { email: req.body.email };
    const result = await collection.find(query).toArray();

    if (result.length === 0) {
      // Email is not in the database, so insert it
      const hashedPassword = await bcrypt
        .hashSync(req.body.password, salt)
        .replace(`${salt}.`, "");

      const reponse_insert = await collection.insertOne({
        email: req.body.email,
        password: hashedPassword,
      });
      console.log(`reponse_insert: ${reponse_insert.insertedId}`);
      let token = jwt.sign({ id: req.body.email }, jwtsalt, {
        expiresIn: jwt_expiration,
      });
      let decoded = jwt.decode(token); // decode the token

      res
        .status(200)
        .setHeader("Authorization", `Bearer ${token}`)
        .json({
          message: "User authenticated",
          user: {
            id: decoded.id,
          },
        });
    } else {
      console.log(`Email already exists: ${req.body.email}`);
      return res.status(406).json({ message: "Email already exists" });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
}

async function auth_signin(req, res) {
  try {
    await client.connect();
    // console.log(`Request Body: ${req.body}`);

    const database = client.db("EventHQ");
    const collection = database.collection("users");

    const query = { email: req.body.email };
    const result = await collection.find(query).toArray();

    if (result.length == 0)
      res.status(406).json({ message: "User is not registered" });
    else {
      if (
        result[0].password !=
        bcrypt.hashSync(req.body.password, salt).replace(`${salt}.`, "")
      )
        return res.status(406).json({ message: "Wrong password" });
      else {
        let token = jwt.sign({ id: req.body.email }, jwtsalt, {
          expiresIn: jwt_expiration,
        });
        let decoded = jwt.decode(token);

        res
          .status(200)
          .setHeader("Authorization", `Bearer ${token}`)
          .json({
            message: "User authenticated",
            user: {
              id: decoded.id,
            },
          });
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  } finally {
    await client.close();
  }
}
