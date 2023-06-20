const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../../utils/validation");

const { setTokenCookie } = require("../../../utils/auth.js");
const { Member } = require("../../../db/models");

/* new user registration page fetch api */
router.get("/new", (req, res) => {
	res.send("this page will include the signup form");
});

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
		.isEmail()
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

/* submit new user registration api */
router.post(
	"/",
	validateSignup,
	asyncHandler(async (req, res, next) => {
		const { f_name, l_name, username, dob, ssn, phone, email, password } =
			req.body;

		const newMember = await Member.signup({
			f_name,
			l_name,
			username,
			dob,
			ssn,
			phone,
			email,
			password,
		});

		await setTokenCookie(res, newMember);

		return res.json({ newMember });
	})
);

/*
- TODO -
GET  /users/xxx // gets and renders current user data in a profile view

POST /users/xxx // updates new information about user
*/

module.exports = router;
