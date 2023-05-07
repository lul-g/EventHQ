const express = require("express");
const router = express.Router();
const getAll = require("../lib/getAll").getAll;
const getOne = require("../lib/getOne").getOne;

router.get("/", async (req, res) => {
  const events = await getAll(req, res, "event");
  const orgs = await getAll(req, res, "org");

  res.render("public/public", {
    events: events,
    orgs: orgs,
  });
});

router.get("/events/:id", async (req, res) => {
  const event = await getOne(req, res, "event", req.params.id);

  res.render("public/event", {
    event: event,
  });
});

router.get("/orgs/:id", async (req, res) => {
  const org = await getOne(req, res, "org", req.params.id);

  res.render("public/org", {
    org: org,
  });
});

router.get("/about", async (req, res) => {
  res.render("public/about");
});

router.get("/contact", async (req, res) => {
  res.render("public/contact");
});
module.exports = router;
