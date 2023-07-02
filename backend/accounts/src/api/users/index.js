const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { validateToken } = require("../../../utils");

router.get("/me", validateToken, (req, res) => {
	if (req.currUser)
		return res.json({
			user: req.currUser,
		});
	else {
		const err = new Error("No user exists");
		throw err;
	}
});

module.exports = router;
