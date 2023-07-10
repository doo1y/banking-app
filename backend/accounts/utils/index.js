const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { Account, Txn } = require("../db/models");
const { Op } = require("sequelize");

const { secret, expiresIn } = jwtConfig;

const constructAccountData = async (req, res, next) => {
	var { accn, balance, accType, paymentNetwork, accnBalance } = req.body;
	if (!req.currUser) {
		return next();
	}
	req.errorList = new Array();

	try {
		if (
			!paymentNetwork ||
			!["VISA", "MasterCard", "Amex", "Discover"].includes(paymentNetwork)
		)
			req.errorList.push("Please provide a valid transfer network provider");
		req.body.paymentNetwork =
			paymentNetwork === "VISA"
				? "V"
				: paymentNetwork === "MasterCard"
				? "MC"
				: paymentNetwork === "Amex"
				? "AMEX"
				: paymentNetwork === "Discover"
				? "DC"
				: "V";
		if (!accType || !["C", "S", "CD", "MMA"].includes(accType))
			req.errorList.push("Please provide a valid account type");

		if (balance) {
			if (balance < 0) {
				req.errorList.push("Balance amount cannot be smaller than 0");
			}
			if (!accn)
				req.errorList.push("An account to transfer funds from required");
			if (accnBalance < balance)
				req.errorList.push("Insufficient funds in selected account");
		}

		if (req.errorList.length) return next();
	} catch (e) {
		req.errorList.push(e);
		return next();
	}

	req.body.memberId = req.currUser.id;

	return next();
};

// middleware for retriving details about the logged in user
const validateToken = (req, res, next) => {
	const { token } = req.cookies;

	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
		if (err) return next();

		try {
			req.currUser = jwtPayload.data;
		} catch (e) {
			res.clearCookie("token");
			return next();
		}

		if (!req.currUser) res.clearCookie("token");

		return next();
	});
};

// middleware for retriving a single account's detail as well as it's txns
// const getAccountData = (req, res, next) => {
// 	const { token } = req.cookies;
// 	const { accountId } = req.params; // this is the primary key of the Account

// 	return jwt.verify(token, secret, null, async (err, jwtPayload) => {
// 		if (err) return next();
// 		try {
// 			const { id } = jwtPayload.data; // this is the primary key of the Member

// 			req.account = await Account.scope("selectedAccount").findOne({
// 				where: {
// 					[Op.and]: [{ id: accountId }, { member_id: id }],
// 				},
// 			});

// 			if (!req.account) return next();
// 		} catch (e) {
// 			res.clearCookie("token");
// 			return next();
// 		}

// 		return next();
// 	});
// };

module.exports = { validateToken, constructAccountData };
