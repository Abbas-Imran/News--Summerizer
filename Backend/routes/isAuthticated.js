const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
const {userModel} = require("../models/User")

router.post(
    "/",
    asyncWrapper(async (req, res) => {
      const { username } = req.body;
      console.log(username)
  
      try {
        const user = await userModel.findOne({ username: username });
  
        if (user) {
          res.send(user.approved);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        res.status(500).send("Internal server error"); 
      }
    })
  );

module.exports = router;