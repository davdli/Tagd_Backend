const router = require("express").Router();
const {
  models: { User, Host },
} = require("../db");


router.post("/login", async (req, res, next) => {
  try {
    const loginInfo = { email: req.body.email, password: req.body.password };
    let token = await User.authenticate(loginInfo);
    if (token !== "Incorrect username/password") {
      res.send({ user: await User.findByToken(token) });
    } else {
      let token = await Host.authenticate(loginInfo);
      res.send({ user: await Host.findByToken(token) });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/signup", async (req, res, next) => {
  try {
    //this is done to protect against injection attacks, so they can't change the type
    const { firstName, lastName, password, email, userType } = req.body;

    if (userType === 'guest') {
      const user = await User.create({
        firstName,
        lastName,
        password,
        email
      });
      res.send({ token: await user.generateToken() });
    } else {
      const host = await Host.create({
        firstName,
        lastName,
        password,
        email
      });
      res.send({ token: await host.generateToken() });
    }
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
