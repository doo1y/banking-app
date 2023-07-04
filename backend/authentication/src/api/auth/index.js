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

const validateSignup = [
	check("f_name")
		.exists({ checkFalsy: true })
		.withMessage("Please provide your first name."),
	check("l_name")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a last name."),
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please providea valid email."),
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a valid username."),
	check("dob")
		.exists({ checkFalsy: true })
		.withMessage("Please provide your date of birth."),
	check("ssn")
		.exists({ checkFalsy: true })
		.withMessage("Please provide your ssn."),
	check("phone")
		.exists({ checkFalsy: true })
		.withMessage("Please provide your phone number."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

/* login page fetch api */
router.get("/new", (req, res) => {
	res.send("this page will have the login form");
});

router.post(
	"/register",
	validateSignup,
	asyncHandler(async (req, res, next) => {
		const { f_name, l_name, username, dob, ssn, phone, email, password } =
			req.body;

		const user = await Member.signup({
			f_name,
			l_name,
			ssn,
			dob,
			username,
			email,
			phone,
			password,
		});

		if (!user) {
			const err = new Error("Login Failed");
			err.status = 401;
			err.title = "Login failed";
			err.errors = ["The provided credentials were invalid"];
			return next(err);
		}

		console.log(user);

		setTokenCookie(res, user);

		return res.json({ user });
	})
);

/* authentication and session login uri */
router.post(
	"/",
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body;

		const user = await Member.login({ credential, password });

		if (!user) {
			const err = new Error("Login Failed");
			err.status = 401;
			err.title = "Login failed";
			err.errors = ["The provided credentials were invalid"];
			return next(err);
		}

		setTokenCookie(res, user);

		return res.json({
			status: "a",
			user,
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
			user: member.toSafeObject(),
		});
	else return res.json({});
});

module.exports = router;
