const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const Rating = require("../models/Rating.model");
const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;

    if (email === "" || password === "" || userName === "") {
      res
        .status(400)
        .json({ message: "Please provide Username, email and password" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (emailRegex.test(email) === false) {
      res.status(400).json({ message: "Please provide a valid email address" });
      return;
    }

    const alreadyUser = await User.findOne({ email: email });

    if (alreadyUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registeredUser = await User.create({
      email: email,
      password: hashedPassword,
      userName: userName,
    });

    const { email: userEmail, userName: name, _id: _id } = registeredUser;

    const user = { email: userEmail, userName: name, _id: _id };

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password" });
      return;
    }

    const registeredUser = await User.findOne({ email: email });
    if (!registeredUser) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const correctPassword = await bcrypt.compare(
      password,
      registeredUser.password
    );

    if (correctPassword) {
      const { email, userName, _id } = registeredUser;

      const user = { email, userName, _id };

      const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken: authToken });
    } else {
      res.status(400).json({ message: "Unable to authorize the user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

router.get("/users/:userId/reviews", async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await Rating.find({ userId }).populate("gameId", "name");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
});

module.exports = router;
