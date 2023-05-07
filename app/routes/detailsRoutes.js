const express = require("express");
const router = express.Router();
const getOne = require("../lib/getOne").getOne;

// router.post("/:id", async (req, res) => {
//   const event = await getOne(req, res, "event", req.params.id);
//   res.status(200).json({
//     message: `All ${req.body.model}s fetched`,
//     model: allDocs,
//   });
// });

router.get("/events/:id", async (req, res) => {
  const event = await getOne(req, res, "event", req.params.id);
  const user = await getOne(req, res, "user", req.query.uid);

  res.render("private/event", {
    user: user,
    event: event,
  });
});
router.get("/orgs/:id", async (req, res) => {
  const org = await getOne(req, res, "org", req.params.id);
  const user = await getOne(req, res, "user", req.query.uid);

  res.render("private/org", {
    user: user,
    org: org,
  });
});

router.get("/", (req, res) => {
  res.json(req.user);
});

module.exports = router;
