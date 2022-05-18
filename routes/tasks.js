const express = require("express");
const router = express.Router();
const task = require("../models/taskmodel");
const jwt = require("jsonwebtoken");
const e = require("express");

//getting all appointments
router.get("/", async (req, res) => {
  if (req.headers.auth_token.length > 4) {
    const id = jwt.verify(req.headers.auth_token, process.env.SECRET)._id;
    if (!id) {
      res.json({ email: "Invalid token" });
    } else {
      const tasks = await task.find({ user: id });
      res.json(tasks);
    }
  } else {
    res.status(200);
  }
});

// creating the appointment
router.post("/", (req, res) => {
  const id = jwt.verify(req.headers.auth_token, process.env.SECRET)._id;
  const Task = new task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
    user: id,
  });
  Task.save()
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

// deleting the appointment
router.delete("/:id", (req, res) => {
  task
    .findByIdAndDelete(req.params.id)
    .then()
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
  res.status(200);
});

// getting individual appointments
router.get("/:id", (req, res) => {
  task
    .findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

// for updating
router.put("/:id", (req, res) => {
  task.findByIdAndUpdate(
    req.params.id,
    { reminder: req.body.reminder },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    }
  );
  res.status(200);
});

module.exports = router;
