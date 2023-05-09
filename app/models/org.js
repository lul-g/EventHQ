const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Event = require("./event");

const orgSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Org", orgSchema);
