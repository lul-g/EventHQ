const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function createOne(req, res) {
  const model = req.body.model;
  const userInfo = req.body.userInfo;
  const Model = model == "event" ? Event : model == "org" ? Org : User;
  try {
    const insertedDoc = Model.insertOne(userInfo);
    return insertedDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { createOne };
