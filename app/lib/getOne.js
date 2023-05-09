const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");
const Event = require("../models/event");
const Org = require("../models/org");

const AID = "64598b47f105147ef93de05f";
async function getOne(req, res, model, id) {
  const Model = model == "event" ? Event : model == "org" ? Org : User;

  try {
    const oneDoc = await Model.findById(id).lean();
    return oneDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

async function getAdmin(req, res) {
  try {
    const oneDoc = await User.findById(AID).lean();
    return oneDoc;
  } catch (err) {
    console.error(`Error retrieving data: ${err}`);
    res.status(500).json({ error: "Error retrieving data" });
  }
}

module.exports = { getOne, getAdmin };
