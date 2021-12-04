const router = require("express").Router();
const {
  models: { User, Host },
} = require("../db");


router.post("/login", async (req, res, next) => {
  try {
    const loginInfo = { email: req.body.email, password: req.body.password };
    const userToken = await User.authenticate(loginInfo);
    const hostToken = await Host.authenticate(loginInfo);
    if (userToken) {
      res.send({ user: await User.findByToken(userToken) });
    } else {
      console.log('Incorrect username/password')
    }
    if (hostToken) {
      res.send({ user: await Host.findByToken(hostToken) });
    } else {
      console.log('Incorrect username/password')
    }
  } catch (err) {
    next(err);
  }
});
router.post("/signup", async (req, res, next) => {
  try {
    //this is done to protect against injection attacks, so they can't change the type
    const { firstName, lastName, password, email } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      password,
      email
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
