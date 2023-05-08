const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Event = require("./event");
const Org = require("./org");

const userSchema = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  bio: [{ type: String, required: false }],
  location: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: String, required: false }],
  attending: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  organizing: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  memberships: [{ type: Schema.Types.ObjectId, ref: "Org" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
