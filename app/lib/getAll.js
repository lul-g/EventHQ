const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

async function getAll(req, res, model) {
  const Model = model == "event" ? Event : model == "org" ? Org : User;

  try {
    const allDocs = await Model.find().lean();
    model += "s";
    return allDocs;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { getAll };
