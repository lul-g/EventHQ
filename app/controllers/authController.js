const client = require("../utils/database").client;
const bcrypt = require("bcrypt");
const path = require("path");

const jwt = require("jsonwebtoken");
const jwt_expiration = 86400000;
const jwtsalt = "privatekey";

const salt = "$2b$10$Imnq7Q2r0RS7DqaKV0rpPe";

async function signup(req, res) {
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

async function login(req, res) {
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

module.exports = { login, signup };
