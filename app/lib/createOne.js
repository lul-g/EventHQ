const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

const bcrypt = require("bcrypt");
const salt = "$2b$10$Imnq7Q2r0RS7DqaKV0rpPe";

const createOne = {
  user: async (req, res) => {
    const { firstName, lastName, location, bio, username, email, password } =
      req.body.userInfo;
    try {
      const emails_found = await User.findOne({ email });
      const users_found = await User.findOne({ username });

      if (emails_found || users_found) {
        return emails_found ? "email" : "username";
      }
      const hashedPassword = await bcrypt
        .hashSync(password, salt)
        .replace(`${salt}.`, "");

      let user = new User({
        firstName: firstName,
        lastName: lastName,
        location: location,
        bio: bio,
        username: username,
        email: email,
        password: hashedPassword,
      });
      const insertedDoc = User.create(user);
      return insertedDoc;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
  org: async (req, res) => {
    const org = req.body.orgInfo;
    try {
      const insertedDoc = Org.create(org);
      console.log(insertedDoc);
      return insertedDoc;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
  event: async (req, res) => {
    const event = req.body.eventInfo;

    try {
      const insertedDoc = Event.create(event);
      return insertedDoc;
    } catch (err) {
      console.error(`Error retrieving data: ${err}`);
      res.status(500).json({ error: "Error retrieving data" });
    }
  },
};

module.exports = { createOne };
