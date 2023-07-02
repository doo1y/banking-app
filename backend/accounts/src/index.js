const router = require("express").Router();
const apiRouter = require("./api");

router.use("/api/v1", apiRouter);

if (process.env.NODE_ENV === "production") {
	const path = require("path");
	router.get("/", (req, res) => {
		res.cookie("XSRF-Token", req.csrfToken());
		return res.sendFile(
			path.resolve(__dirname, "../../../frontend", "build", "index.html")
		);
	});

	router.use(express.static(path.resolve("../../../frontend/build")));

	router.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.sendFile(
			path.resolve(__dirname, "../../../frontend", "build", "index.html")
		);
	});
}

if (process.env.NODE_ENV !== "production") {
	router.get("/api/v1/csrf/restore", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.json({});
	});
}

module.exports = router;
