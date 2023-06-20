const router = require("express").Router(),
	sessionRouter = require("./session"),
	userRouter = require("./user");

router.use("/session", sessionRouter);

router.use("/user", userRouter);

router.post("/", (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
