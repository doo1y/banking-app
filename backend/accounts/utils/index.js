const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { Account, Txn } = require("../db/models");
const { Op } = require("sequelize");

const { secret, expiresIn } = jwtConfig;

const constructAccountData = async (req, res, next) => {
	var { accn, balance, acc_type, network } = req.body;
	accn = !accn || !balance ? "" : accn;
	if (!req.currUser) {
		return next();
	}
	req.errorList = new Array();
	let sender;
	try {
		if (
			!network ||
			!["VISA", "MasterCard", "Amex", "Discover"].includes(network)
		) {
			req.errorList.push("Please provide a valid transfer network provider");
		}
		if (!acc_type || !["C", "S", "CD", "MMA"].includes(acc_type)) {
			req.errorList.push("Please provide a valid account type");
		}
		if (balance) {
			if (balance < 0) {
				req.errorList.push("Balance amount cannot be smaller than 0");
			}
			if (balance > 0) {
				if (!accn)
					req.errorList.push("An account to transfer funds from required");
				sender = await Account.scope("getBalance").findOne({
					where: {
						[Op.and]: [
							{ account_number: accn },
							{ member_id: req.currUser.id },
						],
					},
				});
				if (!sender) req.errorList.push("Transferring account not found");
				if (sender.balance < balance)
					req.errorList.push("Insufficient funds in selected account");
				sender.balance -= balance;
				await sender.save();
			}
		}
		if (req.errorList.length) return next();
	} catch (e) {
		req.errorList.push(e);
		return next();
	}

	req.body = {
		member_id: req.currUser.id,
		acc_type: acc_type,
		payment_network: network,
		balance: balance,
	};

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
