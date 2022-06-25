const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Create a user using "/api/auth/createUser". No login required.
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // If there are errors, return errors with a bad request of status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user already exists with a same email
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error:
            "Sorry an user with same email already exists. Please use a different email",
        });
      }
      const salt= await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

module.exports = router;
