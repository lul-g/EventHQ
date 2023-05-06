const express = require("express");
const router = express.Router();
const fs = require("fs");
const checkCookie = require("../middleware/checkCookie").checkCookie;
const getAll = require("../lib/getAll").getAll;

router.post("/:id", checkCookie, async (req, res) => {
  const allDocs = await getAll(req, res, req.body.model);
  res.status(200).json({
    message: `All ${req.body.model}s fetched`,
    model: allDocs,
  });
});

router.get("/:id", checkCookie, (req, res) => {
  res
    .status(200)
    .send(fs.readFileSync("./app/views/private/private.html", "utf-8"));
});

router.get("/", checkCookie, (req, res) => {
  res.json(req.user);
});

router.get("/:id/profile", checkCookie, (req, res) => {
  // load ur html for user profile page here
});

module.exports = router;
