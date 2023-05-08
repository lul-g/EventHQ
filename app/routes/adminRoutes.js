const express = require("express");
const router = express.Router();
const checkCookie = require("../middleware/checkCookie").checkCookie;
const getAll = require("../lib/getAll").getAll;
const getOne = require("../lib/getOne").getOne;
const updateOne = require("../lib/updateOne").updateOne;
const deleteOne = require("../lib/deleteOne").deleteOne;
const createMany = require("../lib/createMany").createMany;

router.get("/", checkCookie, (req, res) => {
  res.render("admin/admin");
});

// events - start

router.get("/events", checkCookie, async (req, res) => {
  const events = await getAll(req, res, "event");

  res.render("admin/entities/events/events", {
    events: events,
  });
});

// events-end

// users - start
router.get("/users", checkCookie, async (req, res) => {
  const users = await getAll(req, res, "user");

  res.render("admin/entities/users/users", {
    users: users,
  });
});
router.post("/users", checkCookie, (req, res) => {
  const multiData = createMany(req, res);
  res.status(200).send({ multiData: multiData });
});

router.get("/users/:id", checkCookie, async (req, res) => {
  const user = await getOne(req, res, "user", req.params.id);

  // update/delete/view one
  res.render("admin/entities/users/CRUD/detail", {
    user: user,
  });
});
router.delete("/users/:id", checkCookie, async (req, res) => {
  const delMsg = await deleteOne(req, res, "user", req.params.id);
  res.status(200).send({ msg: "User deleted", delMsg: delMsg });
});

router.get("/create/user", checkCookie, async (req, res) => {
  // create one
  res.render("admin/entities/users/CRUD/create");
});
router.post("/create/user", checkCookie, async (req, res) => {
  const user = await createOne(req, res, "user");
  res.status(200).send({ user: user });
});

router.get("/users/:id/edit", checkCookie, async (req, res) => {
  const user = await getOne(req, res, "user", req.params.id);

  res.render("admin/entities/users/CRUD/edit", {
    user: user,
  });
});
router.put("/users/:id/edit", checkCookie, async (req, res) => {
  const user = await updateOne(req, res, "user");
  res.status(200).send({ user: user });
});

// users - end

// orgs

router.get("/orgs", checkCookie, async (req, res) => {
  const orgs = await getAll(req, res, "org");

  res.render("admin/entities/orgs/orgs", {
    orgs: orgs,
  });
});

module.exports = router;
