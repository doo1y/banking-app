const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../../utils/validation");
const cookieParser = require("cookie-parser");
const { secret } = require("../../../config");
const { setTokenCookie, restoreMember } = require("../../../utils/auth");
const { Member } = require("../../../db/models");

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Please provide a valid email or username."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

/* login page fetch api */
router.get("/new", (req, res) => {
	res.send("this page will have the login form");
});

/* authentication and session login uri */
router.post(
	"/",
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body;

		const member = await Member.login({ credential, password });

		if (!member) {
			const err = new Error("Login Failed");
			err.status = 401;
			err.title = "Login failed";
			err.errors = ["The provided credentials were invalid"];
			return next(err);
		}

		await setTokenCookie(res, member);

		return res.json({
			status: "a",
			member,
		});
	})
);

/* session logout URI */
router.delete("/", (_req, res) => {
	res.clearCookie("token");
	return res.json({
		message: "Successfully Logged Out",
	});
});

router.get("/", restoreMember, (req, res) => {
	const { member } = req;
	if (member)
		return res.json({
			member: member.toSafeObject(),
		});
	else return res.json({});
});

module.exports = router;
