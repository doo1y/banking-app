const router = require("express").Router(),
	authRouter = require("./auth");

router.use("/auth", authRouter);

module.exports = router;
