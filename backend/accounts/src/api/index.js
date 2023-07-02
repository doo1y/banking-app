const router = require("express").Router();
const userRouter = require("./users");
const accountRouter = require("./acc");

router.use("/users", userRouter);

router.use("/accounts", accountRouter);

module.exports = router;
