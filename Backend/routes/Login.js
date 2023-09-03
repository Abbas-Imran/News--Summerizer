const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User");
const { BadRequest } = require("../errors/bad-request");
const asyncWrapper = require("../middleware/async");
const bcrypt = require("bcrypt");


router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.findOne({ username: username });
    if (!user) res.status(400).send({ msg: "Invalid Username or Password" });

    const validPassword = await user.comparePassword(password);
    // const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      res.status(400).send({ msg: "Invalid Username or Password" });
    } else {
      const token = await user.genrateToken();
      console.log(token);
      res.header("x-auth-token", token).send({ token: token });
    }
  })
);
module.exports = router;
