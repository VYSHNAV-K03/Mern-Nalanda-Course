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

  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  console.log(token);

  req.token = token;
  next();
};

module.exports = { hashPasswordMiddleware, paswordMiddleware, CreateToken };
