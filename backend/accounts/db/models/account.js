"use strict";
const { Model } = require("sequelize");
const generater = require("creditcard-generator");

module.exports = (sequelize, DataTypes) => {
	class Account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Account.hasMany(models.Txn, { foreignKey: "account_id" });
		}
	}
	Account.init(
		{
			account_number: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isCreditCard: true,
					notNull: true,
					notEmpty: true,
				},
			},
			member_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
				},
			},
			acc_type: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["C", "S", "CD", "MMA"],
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			payment_network: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ["V", "MC", "AMEX", "DC"],
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			balance: {
				type: DataTypes.FLOAT,
				defaultValue: 0.0,
				validate: { isFloat: true },
			},
			isOpen: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			exp: {
				type: DataTypes.DATE,
				defaultValue: new Date(
					new Date().setFullYear(new Date().getFullYear() + 2)
				),
				allowNull: false,
				validate: {
					notNull: true,
					isDate: true,
				},
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: [
						"balance",
						"account_number",
						"account_type",
						"isOpen",
						"member_id",
						"payment_network",
						"isOpen",
						"exp",
						"created_at",
						"updatedAt",
					],
				},
			},
			scopes: {
				retriveBalance: {
					attributes: {
						exclude: [
							"account_number",
							"account_type",
							"isOpen",
							"member_id",
							"isOpen",
							"payment_network",
							"exp",
							"created_at",
							"updatedAt",
						],
					},
				},
				memberAccounts: {
					attributes: {
						exclude: ["id", "member_id", "created_at", "updatedAt"],
					},
				},
				selectedAccount: {
					attributes: {},
				},
			},
			sequelize,
			modelName: "Account",
		}
	);

	Account.createAccount = async function (userData) {
		const { Op } = require("sequelize");
		var { accn, memberId, accType, balance, paymentNetwork } = userData;
		console.log(balance);
		var exp = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
		var isOpen = true;

		if (balance) {
			var account = await Account.scope("retriveBalance").findOne({
				where: {
					[Op.and]: [{ account_number: accn }, { member_id: memberId }],
				},
			});
			if (!account) throw new Error("Transferring Account Not found");
			if (account.balance < balance) throw new Error("Not enough funds!");
			account.balance -= balance;

			await account.save();
		}

		var accountNumber = generater.GenCC(paymentNetwork).pop();
		console.log(`\n\n\n\n\n${JSON.stringify(newAcc)}\n\n\n\n\n`);

		var newAcc = Account.build({
			account_number: accountNumber,
			member_id: memberId,
			acc_type: accType,
			payment_network: paymentNetwork,
			balance,
			isOpen,
			exp,
		});
		console.log(`\n\n\n\n\n${JSON.stringify(newAcc)}\n\n\n\n\n`);
		if (newAcc) {
			await newAcc.save();
			return await Account.scope("selectedAccount").findByPk(newAcc.id);
		} else throw new Error("account not");
	};

	Account.getAllAccounts = async function (memberId) {
		const accounts = await Account.scope("memberAccounts").findAll({
			where: {
				member_id: memberId,
			},
		});

		if (!accounts) {
			throw new Error("Account Unavailable");
		}
		return accounts;
	};

	Account.getSelectedAccount = async function (accountId, memberId) {
		const { Op } = require("sequelize");
		const account = await Account.scope("selectedAccount").findOne({
			where: {
				[Op.and]: [{ id: accountId }, { member_id: memberId }],
			},
		});

		if (!account) {
			throw new Error("Account Unavailable");
		} else return account;
	};
	return Account;
};
