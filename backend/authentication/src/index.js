const router = require("express").Router(),
	apiRouter = require("./api");

router.use("/api", apiRouter);

router.get("/test-uri", (req, res) => {
	res.cookie("XSRF-TOKEN", req.csrfToken());
	res.send("XSRF-TOKEN added to cookies");
});

module.exports = router;
