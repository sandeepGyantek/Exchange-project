const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("./../models/User");
const Profile = require("./../models/Profile");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

// @route POST api/users
// @desc User signup api
// @access public
router.post(
  "/",
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // const userId = user;
      profile = new Profile({
        email,
        avatar,
        user,
      });
      await profile.save();

      res.status(200).json({
        userId: user.id,
        msg: "successfully register",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
