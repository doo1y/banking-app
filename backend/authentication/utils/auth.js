const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { Member } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, member) => {
	const token = jwt.sign(
		{ data: member.toSafeObject() },
		secret,
		{ expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
	);

	const isProduction = process.env.NODE_ENV === "production";

	// Set the token cookie
	res.cookie("token", token, {
		maxAge: expiresIn * 1000, // maxAge in milliseconds
		httpOnly: true,
		secure: isProduction,
		sameSite: isProduction && "Lax",
	});

	return token;
};

const restoreMember = (req, res, next) => {
	const { token } = req.cookies;

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) return next();

		try {
			const { id } = jwtPayload.data;
			req.member = await Member.scope("currentMember").findByPk(id);
		} catch (e) {
			res.clearCookie("token");
			return next();
		}

		if (!req.member) res.clearCookie("token");

		return next();
	});
};

const requireAuth = [
	restoreMember,
	function (req, _res, next) {
		if (req.member) return next();

		const err = new Error("Unauthorized");
		err.title = "Unauthorized";
		err.errors = ["Unauthorized"];
		err.status = 401;
		return next(err);
	},
];

module.exports = {
	setTokenCookie,
	restoreMember,
	requireAuth,
};
