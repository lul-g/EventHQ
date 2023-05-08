const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function deleteOne(req, res, model, id) {
  const Model = model == "event" ? Event : model == "org" ? Org : User;

  try {
    const delteDoc = await Model.deleteOne({ _id: id });
    return delteDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { deleteOne };
