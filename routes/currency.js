const express = require("express");
const router = express.Router();
const Currency = require("./../models/Currency");
const User = require("./../models/User");
const auth = require("./../middleware/auth");

// @route GET api/currency
// @desc To get currency
// @access public
router.get("/", async (req, res) => {
  try {
    const currency = await Currency.find();
    res.json(currency);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/currency
// @desc User signup api
// @access public
router.post("/", async (req, res) => {
  const { threeDigitName, fullName, imageUrl } = req.body;
  try {
    currency = new Currency({
      threeDigitName,
      fullName,
      imageUrl,
    });

    await currency.save();

    res.status(200).json({
      msg: "successfully enter data",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
