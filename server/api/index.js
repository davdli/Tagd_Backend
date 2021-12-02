const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/tags", require("./tags"));

router.use("/locations", require("./locations"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
