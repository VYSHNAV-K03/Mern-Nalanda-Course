const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  hashPasswordMiddleware,
  paswordMiddleware,
  CreateToken,
} = require("../middleware/authMiddleware");

const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", hashPasswordMiddleware, (req, res) => {
  const { name, email, role } = req.body;

  const hashPassword = req.hashp;

  User.findOne({ email })
    .then((user) => {
      console.log(user);

      if (user) {
        res.send("user already exist");
      } else {
        const save_user = new User({
          name,
          email,
          password: hashPassword,
          role,
        });

        save_user
          .save()
          .then(() => {
            res.send("user registered successfully");
          })
          .catch((er) => {
            console.log(er);
          });
      }
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/login", paswordMiddleware, CreateToken, (req, res) => {
  console.log("user", req.user);

  const user = req.user;
  const token = req.token;

  res.send({
    message: "user logged in successfully",
    token: token,
    role: user.role,
    user: user,
  });
});

module.exports = router;
