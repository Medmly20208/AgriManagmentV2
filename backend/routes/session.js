const router = require("express").Router();
const Sessions = require("../models/session.model");

router.route("/:clientid").get((req, res) => {
  Sessions.find({ clientid: req.params.clientid })
    .then((sessions) => res.json(sessions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const clientid = req.body.clientid;
  const instructorid = req.body.Instructorid;
  const course = req.body.course;
  const instructorname = req.body.instructorname;
  const place = req.body.place;
  const time = req.body.time;
  const images = req.body.images;

  const newSession = new Sessions({
    instructorid,
    course,
    clientid,
    instructorname,
    place,
    time,
    images,
  });

  newSession
    .save()
    .then(() => res.json("Session Added"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Sessions.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Session of id ${req.params.id} is deleted`))
    .catch((err) => res.status(400).json("Error", err));
});

router.route("/updatesessions/:id").post((req, res) => {
  Sessions.findById(req.params.id)
    .then((session) => {
      //change just the fields that exist in req.body
      for (let i of Object.keys(req.body)) {
        if (req.body[i] === "") {
          continue;
        }

        session[i] = req.body[i];
      }

      session
        .save()
        .then(() => res.json("session updated"))
        .catch((err) => res.status(400).json("error", err));
    })
    .catch((err) => res.status(400).json("Error", err));
});

module.exports = router;
