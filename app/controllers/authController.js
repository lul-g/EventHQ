const mongoose = require("mongoose");
const path = require("path");

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const salt = "$2b$10$Imnq7Q2r0RS7DqaKV0rpPe";

const jwt = require("jsonwebtoken");
const jwt_expiration = 86400000;
const jwtsalt = "privatekey";
const cookieParser = require("cookie-parser");

const User = require("../models/user");

app.use(express.json());
app.use(cookieParser());

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const emails_found = await User.findOne({ email });
    const users_found = await User.findOne({ username });

    if (emails_found || users_found) {
      console.log(`Email already exists: ${req.body.email}`);
      return emails_found
        ? res.status(406).json({ message: "Email already exists" })
        : res.status(406).json({ message: "Username already exists" });
    } else {
      const hashedPassword = await bcrypt
        .hashSync(password, salt)
        .replace(`${salt}.`, "");

      let user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      // console.log(savedUser);

      let token = jwt.sign({ id: savedUser.username }, jwtsalt, {
        expiresIn: jwt_expiration,
      });

      res
        .status(200)
        .cookie("_cookie_", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({
          message: "User authenticated",
          user: savedUser,
        });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const usernameFound = await User.findOne({ username });
    if (!usernameFound)
      return res.status(406).json({ message: "User is not registered" });
    if (
      usernameFound.password !=
      bcrypt.hashSync(password, salt).replace(`${salt}.`, "")
    )
      return res.status(406).json({ message: "Wrong password" });
    else {
      let token = jwt.sign({ id: usernameFound.username }, jwtsalt, {
        expiresIn: jwt_expiration,
      });

      res
        .status(200)
        .cookie("_cookie_", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({
          message: "User authenticated",
          user: usernameFound,
        });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

async function logout(req, res) {
  res.clearCookie("_cookie_");
  res.json({ message: "Logged out" });
}

module.exports = { login, signup, logout };
