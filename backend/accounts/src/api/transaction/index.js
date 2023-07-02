const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Account } = require("../../../db/models");

const { validateToken } = require("../../../utils");

router.get(
	"/",
	validateToken,
	asyncHandler(async (req, res, next) => {
		if (!req.currUser) {
			const err = new Error("Please log back in");
			err.title = "Session Timed Out";
			err.errors = ["No logged in user"];
			err.status = 401;
			return next(err);
		}
		try {
			const { accountId } = req.params;
			const account = await Account.getSelectedAccount(
				accountId,
				req.currUser.id
			);

			const accountTxns = (await account.getTxns()) || {};

			res.json({
				user: {
					...req.currUser,

					account: {
						...account,
						transactions: { ...accountTxns },
					},
				},
			});
		} catch (e) {
			next(e);
		}
	})
);

module.exports = router;
