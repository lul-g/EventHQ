const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
  res
    .status(200)
    .send(fs.readFileSync("./app/views/private/private.html", "utf-8"));
});

module.exports = router;
