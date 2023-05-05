const express = require("express");
const router = express.Router();
const app = express();
const fs = require("fs");
const { login, signup } = require("../controllers/authController");

// signup
router.get("/signup", (req, res) => {
  res.status(200).send(fs.readFileSync("./app/views/auth/auth.html", "utf-8"));
});
router.post("/signup", (req, res) => {
  signup(req, res);
});

// login
router.get("/login", (req, res) => {
  res.status(200).send(fs.readFileSync("./app/views/auth/auth.html", "utf-8"));
});

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;
