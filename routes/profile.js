const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("./../models/User");
const Profile = require("./../models/Profile");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route       POST api/profile/edit-password
// @description Update user password
// @access      Private
// @task        ALMOST DONE - NEEDS TO AVOID PASSWORD UPDATING IF NULL
router.post("/edit-password", [auth], async (req, res) => {
  // Destructure
  const { password, new_password } = req.body;

  if (password == "" || new_password == "") {
    // destructure the request
    const { question1, answer1, question2, answer2, question3, answer3 } =
      req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    profileFields.question1 = question1;
    profileFields.answer1 = answer1;
    profileFields.question2 = question2;
    profileFields.answer2 = answer2;
    profileFields.question3 = question3;
    profileFields.answer3 = answer3;


    if (answer1 == "" && answer2 == "" && answer3 == "") {
      return res
      .status(400)
      .json({ errors: [{ msg: "no data update" }] });
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        //   console.log(profile);
        return res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  }

  let user = await User.findOne({ _id: req.user.id });
  console.log(req.user.id);
  console.log(user);
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "current password didn't match." }] });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(new_password, salt);
  await user.save();

  res.send(user);
});

// @route GET api/profile/me
// @desc get current user profile
// @access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/profile
// @desc update user profile
// @access private

router.post("/", auth, async (req, res) => {
  // destructure the request
  const { firstName, lastName, email, phone, langauge, currency } = req.body;
  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (firstName) profileFields.firstName = firstName;
  if (lastName) profileFields.lastName = lastName;
  if (email)
 profileFields.email = email;
  if (phone) profileFields.phone = phone;
  if (langauge) profileFields.langauge = langauge;
  if (currency) profileFields.currency = currency;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      //   console.log(profile);
      return res.json(profile);
    }
    // create
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});
// @route POST api/profile/2fa
// @desc Two factor Authentication
// @access private
router.post("/2fa", auth, async (req, res) => {
  let user = await Profile.findOne({ user: req.user.id });

  const { twoFA } = req.body;

  user.twoFA = twoFA;

  await user.save();
  res.json({ user });
});
module.exports = router;