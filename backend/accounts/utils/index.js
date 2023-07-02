const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { Account, Txn } = require("../db/models");
const { Op } = require("sequelize");

const { secret, expiresIn } = jwtConfig;

// middleware for retriving details about the logged in user
const validateToken = (req, res, next) => {
	const { token } = req.cookies;

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) return next();

		try {
			req.currUser = { ...jwtPayload.data };
		} catch (e) {
			res.clearCookie("token");
			return next();
		}

		if (!req.currUser) res.clearCookie("token");

		return next();
	});
};

// middleware for retriving a single account's detail as well as it's txns
const getAccountData = (req, res, next) => {
	const { token } = req.cookies;
	const { accountId } = req.params; // this is the primary key of the Account

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) return next();
		try {
			const { id } = jwtPayload.data; // this is the primary key of the Member

			req.account = await Account.scope("selectedAccount").findOne({
				where: {
					[Op.and]: [{ id: accountId }, { member_id: id }],
				},
			});

			if (!req.account) return next();
		} catch (e) {
			res.clearCookie("token");
			return next();
		}

		return next();
	});
};

module.exports = { validateToken };
