const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const txnRouter = require("../transaction");
const { Account } = require("../../../db/models");

const { validateToken, constructAccountData } = require("../../../utils");

router.use("/:accountId/transactions", txnRouter);

router.put("/");

router.get(
	"/:accountId",
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
			res.json({
				account: account,
			});
		} catch (e) {
			next(e);
		}
	})
);

router.get(
	"/",
	validateToken,
	asyncHandler(async (req, res, next) => {
		if (!req.currUser) {
			const err = new Error("Please Log Back In");
			err.title = "Session Timed Out";
			err.errors = ["No logged in user"];
			err.status = 401;
			return next(err);
		}
		try {
			const accounts = await Account.getAllAccounts(req.currUser.id);
			res.json({
				accounts,
			});
		} catch (e) {
			next(e);
		}
	})
);

router.post(
	"/new",
	validateToken,
	constructAccountData,
	asyncHandler(async (req, res, next) => {
		if (!req.currUser) {
			const err = new Error("Please Log Back In");
			err.title = "Session Timed Out";
			err.errors = ["No logged in user"];
			err.status = 401;
			return next(err);
		} else if (req.errorList.length) {
			const err = new Error("Data validation failed");
			err.title = "Invalid parameters";
			err.errors = req.errorList;
			err.status(401);
			return next(err);
		}

		const newAcc = await Account.createAccount(req.body);
		const accounts = await Account.getAllAccounts(req.currUser.id);
		res.json({
			accounts: [...accounts],
			newAccount: newAcc,
		});
	})
);

module.exports = router;
