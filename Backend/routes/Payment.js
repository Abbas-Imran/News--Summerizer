const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/async");
var stripe = require("stripe")(process.env.STRIPE_API_KEY);
const {userModel} = require("../models/User")

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    let status, error;
    const { token, amount, username } = req.body;

    try {
      await stripe.charges.create({
        source: token.id,
        amount,
        currency: 'usd',
      });

      let user = await userModel.findOne({ username: username });
      if (user) {
        user.approved = true;
        console.log(user);
        await user.save();
        let userToken = await user.genrateToken();
        status = 'success';
        res.json({ error, status, userToken });
      } else {
        status = 'Failure';
        userToken = false
      }
    } catch (error) {
      console.log(error);
      status = 'Failure';
      userToken = false
    }
    res.json({ error, status, userToken });
  })
);

module.exports = router;