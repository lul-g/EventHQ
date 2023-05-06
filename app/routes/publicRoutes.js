const express = require("express");
const router = express.Router();
const getAll = require("../lib/getAll").getAll;

const user = {
  firstName: "Tim",
  lastName: "Cook",
};
router.get("/", async (req, res) => {
  const events = await getAll(req, res, "event");
  const orgs = await getAll(req, res, "org");

  res.render("public/public", {
    events: events,
    orgs: orgs,
  });
});

module.exports = router;
