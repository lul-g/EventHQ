const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res
    .status(200)
    .send(fs.readFileSync("./app/views/public/public.html", "utf-8"));
});

module.exports = router;
