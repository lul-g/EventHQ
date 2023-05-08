const express = require("express");
const router = express.Router();
const checkCookie = require("../middleware/checkCookie").checkCookie;
const getAll = require("../lib/getAll").getAll;
const getOne = require("../lib/getOne").getOne;
const updateOne = require("../lib/updateOne").updateOne;

router.post("/:id", checkCookie, async (req, res) => {
  const allDocs = await getAll(req, res, req.body.model);
  res.status(200).json({
    message: `All ${req.body.model}s fetched`,
    model: allDocs,
  });
});

router.get("/:id", checkCookie, async (req, res) => {
  const events = await getAll(req, res, "event");
  const orgs = await getAll(req, res, "org");
  const user = await getOne(req, res, "user", req.params.id);

  res.render("private/private", {
    user: user,
    events: events,
    orgs: orgs,
  });
});

router.get("/", checkCookie, (req, res) => {
  res.json(req.user);
});

router.get("/:id/profile", checkCookie, async (req, res) => {
  const user = await getOne(req, res, "user", req.params.id);

  res.render("private/profile", {
    user: user,
  });
});

router.get("/:id/profile/edit", checkCookie, async (req, res) => {
  const user = await getOne(req, res, "user", req.params.id);

  res.render("private/editProfile", {
    user: user,
  });
});

router.put("/:id/profile/edit", checkCookie, async (req, res) => {
  const user = await updateOne(req, res);
  res.status(200).send({ user: user });
});

module.exports = router;
