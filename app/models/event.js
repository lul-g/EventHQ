const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Org = require("./org");
const User = require("./user");

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  location: { type: String, required: true },
  category: { type: String, required: true },
  organizers: [{ type: Schema.Types.ObjectId, ref: "Org", required: false }],
  attendees: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  is_private: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
