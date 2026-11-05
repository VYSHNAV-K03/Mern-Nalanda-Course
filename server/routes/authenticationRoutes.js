const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const router = express.Router();

const hashPasswordMiddleware = (req, res, next) => {
  const { password, confirm_pass } = req.body;

  if (password !== confirm_pass) {
    res.send("password does not match");
  } else {
    bcrypt.hash(password, 10, (error, hashPassword) => {
      if (error) {
        console.log(error);
      } else {
        console.log(hashPassword);

        req.hashp = hashPassword;
        next();
      }
    });
  }
};

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

const paswordMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      console.log(user);

      req.user = user;
      console.log(req);

      if (user) {
        console.log(user.password, password);

        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);

            if (result) {
              next();
            } else {
              res.send({ message: "password does not match", token: null });
            }
          }
        });
      } else {
        res.send({ message: "user does not exist", token: null });
      }
    })
    .catch((er) => {
      console.log(er);
    });
};

const CreateToken = (req, res, next) => {
  const user = req.user;

  const email = user.email;

  const token = jwt.sign({ email }, "json123");
  console.log(token);

  req.token = token;
  next();
};

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
