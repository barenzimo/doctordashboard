const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

router.post("/signup", async (req, res) => {
  const exists = await User.findOne({ email: req.body.email })
    .then()
    .catch((err) => console.log(err));
  if (exists) {
    res.json({ email: "Already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then(() => {
        res.json({ email: "User Created Successfully" });
      })
      .catch((err) => res.send(err));
  }
});

// signin route
router.post("/signin", async (req, res) => {
  const exists = await User.findOne({ email: req.body.email })
    .then()
    .catch((err) => console.log(err));
  if (exists) {
    const pass = await bcrypt.compare(req.body.password, exists.password);
    if (pass) {
      const token = jwt.sign({ _id: exists._id }, process.env.SECRET);
      res.header("auth-token", token);
      res.json({ email: "Successfully logged in", auth_token: token });
    } else {
      res.json({ email: "Password is incorrect" });
    }
  } else {
    res.json({ email: "User Does not exist" });
  }
});
module.exports = router;
