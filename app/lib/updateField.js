const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = require("mongodb");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function updateField(req, res) {
  const model = req.body.model;
  const info = req.body.info;
  const _id = req.body._id;
  const Model = model == "event" ? Event : model == "org" ? Org : User;
  const field = req.body.field;
  console.log(field);
  console.log([field]);

  try {
    await User.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { [field]: info } }
    ).lean();

    const oneDoc = await Model.findById(_id).lean();
    return oneDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { updateField };
