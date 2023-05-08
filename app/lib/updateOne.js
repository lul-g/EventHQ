const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function updateOne(req, res) {
  const model = req.body.model;
  const info = req.body.userInfo;
  const _id = req.body.UID;
  const Model = model == "event" ? Event : model == "org" ? Org : User;

  try {
    await Model.updateOne({ _id: new ObjectId(_id) }, { $set: info }).lean();
    const oneDoc = await Model.findById(_id).lean();
    console.log(oneDoc);
    return oneDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { updateOne };
