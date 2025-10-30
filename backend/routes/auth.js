const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "Aayushisagoodb$oy";
router.use(express.json());

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("name").notEmpty().withMessage("Name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let flag = false;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          msg: "A user already exists with the same email.",
          flag: flag,
        });
      }

      const newUser = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        newUser: {
          id: newUser.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      flag = true;
      res.json({ authtoken: authtoken, flag: flag });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: success, msg: "Enter valid credentials" });
    }
    try {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.json({ success: success, msg: "Enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
