const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Event = require("./event");
const Org = require("./org");

const userSchema = new Schema({
  name: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attending: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  organizing: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  memberships: [{ type: Schema.Types.ObjectId, ref: "Org" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
