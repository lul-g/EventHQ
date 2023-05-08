const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function createMany(req, res) {
  const num = req.body.num;
  const model = req.body.model;
  const Model = model == "event" ? Event : model == "org" ? Org : User;
  try {
    let modelArr = [];
    for (let i = 0; i < num; i++) {
      modelArr.push(
        new Model({
          firstName: Math.random().toString(36).slice(2, 7),
          lastName: Math.random().toString(36).slice(2, 7),
          bio: [
            Math.random().toString(36).slice(2, 7),
            Math.random().toString(36).slice(2, 7),
            Math.random().toString(36).slice(2, 7),
          ],
          location: Math.random().toString(36).slice(2, 7),
          username: Math.random().toString(36).slice(2, 7),
          email: Math.random().toString(36).slice(2, 7),
          password: Math.random().toString(36).slice(2, 7),
        })
      );
    }

    const insertedDocs = User.insertMany(modelArr);
    return insertedDocs;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { createMany };
