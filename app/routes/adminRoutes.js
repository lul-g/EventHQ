const express = require("express");
const checkCookie = require("../middleware/checkCookie").checkCookie;
const getAll = require("../lib/getAll").getAll;
const getOne = require("../lib/getOne").getOne;
const getAdmin = require("../lib/getOne").getAdmin;
const updateOne = require("../lib/updateOne").updateOne;
const deleteOne = require("../lib/deleteOne").deleteOne;
const createMany = require("../lib/createMany").createMany;
const createOne = require("../lib/createOne").createOne;

const router = express.Router();

const rootRouters = express.Router();
const usersRouters = express.Router();
const eventsRouters = express.Router();
const orgsRouters = express.Router();

function rootRoutes() {
  rootRouters.get("/", checkCookie, async (req, res) => {
    const admin = await getAdmin(req, res);
    res.render("admin/admin", { admin: admin });
  });
}

// events - start

function eventsRoutes() {
  eventsRouters.get("/", checkCookie, async (req, res) => {
    const events = await getAll(req, res, "event");
    const admin = await getAdmin(req, res);

    res.render("admin/entities/events/events", {
      events: events,
      admin: admin,
    });
  });
  eventsRouters.post("/", checkCookie, (req, res) => {
    const multiData = createMany.events(req, res);
    res.status(200).send({ multiData: multiData });
  });

  eventsRouters.get("/:id", checkCookie, async (req, res) => {
    const event = await getOne(req, res, "event", req.params.id);
    const admin = await getAdmin(req, res);

    // update/delete/view one
    res.render("admin/entities/events/CRUD/detail", {
      event: event,
      admin: admin,
    });
  });
  eventsRouters.delete("/:id", checkCookie, async (req, res) => {
    const delMsg = await deleteOne(req, res, "event", req.params.id);
    res.status(200).send({ msg: "Event deleted", delMsg: delMsg });
  });

  eventsRouters.get("/create/event", checkCookie, async (req, res) => {
    res.render("admin/entities/events/CRUD/create");
  });
  eventsRouters.post("/create/event", checkCookie, async (req, res) => {
    const response = await createOne.event(req, res);
    res.status(200).send({ event: response });
  });

  eventsRouters.get("/edit/:id", checkCookie, async (req, res) => {
    const event = await getOne(req, res, "event", req.params.id);

    res.render("admin/entities/events/CRUD/edit", {
      event: event,
    });
  });
  eventsRouters.put("/edit/:id", checkCookie, async (req, res) => {
    const event = await updateOne(req, res, "event");
    res.status(200).send({ event: event });
  });
}

// events-end

function usersRoutes() {
  // users - start
  usersRouters.get("/", checkCookie, async (req, res) => {
    const users = await getAll(req, res, "user");
    const admin = await getAdmin(req, res);

    res.render("admin/entities/users/users", {
      users: users,
      admin: admin,
    });
  });
  usersRouters.post("/", checkCookie, (req, res) => {
    const multiData = createMany.users(req, res);
    res.status(200).send({ multiData: multiData });
  });

  usersRouters.get("/:id", checkCookie, async (req, res) => {
    console.log("id:", req.params.id);
    const user = await getOne(req, res, "user", req.params.id);
    const admin = await getAdmin(req, res);

    res.render("admin/entities/users/CRUD/detail", {
      user: user,
      admin: admin,
    });
  });
  usersRouters.delete("/:id", checkCookie, async (req, res) => {
    const delMsg = await deleteOne(req, res, "user", req.params.id);
    console.log(delMsg);
    res.status(200).send({ msg: "User deleted", delMsg: delMsg.deletedCount });
  });

  usersRouters.get("/create/user", checkCookie, async (req, res) => {
    res.render("admin/entities/users/CRUD/create");
  });
  usersRouters.post("/create/user", checkCookie, async (req, res) => {
    const response = await createOne.user(req, res);
    if (response._id) {
      res.status(200).send({ user: response });
    } else {
      response == "email"
        ? res.status(406).json({ message: "Email already exists" })
        : res.status(406).json({ message: "Username already exists" });
    }
  });

  usersRouters.get("/edit/:id", checkCookie, async (req, res) => {
    console.log("EDIT USER:", req.params.id);
    const user = await getOne(req, res, "user", req.params.id);

    res.render("admin/entities/users/CRUD/edit", {
      user: user,
    });
  });
  usersRouters.put("/edit/:id", checkCookie, async (req, res) => {
    const user = await updateOne(req, res);
    res.status(200).send({ user: user });
  });

  // users - end
}

// orgs

function orgsRoutes() {
  // users - start
  orgsRouters.get("/", checkCookie, async (req, res) => {
    const orgs = await getAll(req, res, "org");
    const user = await getAdmin(req, res);

    res.render("admin/entities/orgs/orgs", {
      orgs: orgs,
      user: user,
    });
  });
  orgsRouters.post("/", checkCookie, (req, res) => {
    const multiData = createMany.orgs(req, res);
    res.status(200).send({ multiData: multiData });
  });

  orgsRouters.get("/:id", checkCookie, async (req, res) => {
    const org = await getOne(req, res, "org", req.params.id);
    const admin = await getAdmin(req, res);

    // update/delete/view one
    res.render("admin/entities/orgs/CRUD/detail", {
      org: org,
      admin: admin,
    });
  });
  orgsRouters.delete("/:id", checkCookie, async (req, res) => {
    const delMsg = await deleteOne(req, res, "org", req.params.id);
    if (delMsg.deletedCount)
      res.status(200).send({ msg: "Org deleted", deleted: 1 });
    else res.status(406).send({ msg: "Org not deleted", deleted: 0 });
  });

  orgsRouters.get("/create/org", checkCookie, async (req, res) => {
    res.render("admin/entities/orgs/CRUD/create");
  });
  orgsRouters.post("/create/org", checkCookie, async (req, res) => {
    const response = await createOne.org(req, res);
    res.status(200).send({ org: response });
  });

  orgsRouters.get("/edit/:id", checkCookie, async (req, res) => {
    const org = await getOne(req, res, "org", req.params.id);

    res.render("admin/entities/orgs/CRUD/edit", {
      org: org,
    });
  });
  orgsRouters.put("/edit/:id", checkCookie, async (req, res) => {
    const org = await updateOne(req, res);
    res.status(200).send({ org: org });
  });

  // users - end
}

rootRoutes();
eventsRoutes();
usersRoutes();
orgsRoutes();
module.exports = {
  usersRouters,
  orgsRouters,
  eventsRouters,
  rootRouters,
  eventsRouters,
};
