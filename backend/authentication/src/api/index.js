const router = require("express").Router(),
	authRouter = require("./auth"),
	userRouter = require("./user");

router.use("/auth", authRouter);

router.post("/", (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
