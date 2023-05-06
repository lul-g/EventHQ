const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Event = require("./event");

const orgSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Org", orgSchema);
