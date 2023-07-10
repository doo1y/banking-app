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
				validate: {
					isCreditCard: true,
					allowNull: false,
					notEmpty: true,
				},
			},
			member_id: {
				type: DataTypes.INTEGER,
				validate: {
					allowNull: false,
				},
			},
			acc_type: {
				type: DataTypes.ENUM,
				values: ["C", "S", "CD", "MMA"],
				validate: {
					allowNull: false,
					notEmpty: true,
				},
			},
			payment_network: {
				type: DataTypes.ENUM,
				values: ["V", "MC", "AMEX", "DC"],
				validate: {
					allowNull: false,
					notEmpty: true,
				},
			},
			balance: {
				type: DataTypes.FLOAT,
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
				validate: {
					allowNull: false,
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
						"isOpen",
						"exp",
						"created_at",
						"updatedAt",
					],
				},
			},
			scopes: {
				getBalance: {
					attributes: {
						exclude: [
							"account_number",
							"account_type",
							"isOpen",
							"member_id",
							"isOpen",
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
		var { account_number, member_id, acc_type, balance, payment_network } =
			userData;
		var exp = new Date(new Date().setFullYear(new Date().getFullYear() + 2));
		var isOpen = true;
		// throws error if provided invalid balance
		// checks that transferring balance is above 0, and an account number
		// to withdraw from is provided
		if (extAccountNumber && balance > 0) {
			existingAccount = await Account.scope("checkBalance").findOne({
				where: {
					[Op.and]: [
						{ account_number: extAccountNumber },
						{ member_id: memberId },
					],
				},
			});
			if (existingAccount.balance < balance)
				throw new Error("Not enough funds!");
			existingAccount.balance -= balance;
			await existingAccount.save();
		}

		account_number = generater.GenCC(network);
		payment_network =
			network === "VISA"
				? "V"
				: network === "MasterCard"
				? "MC"
				: network === "Amex"
				? "AMEX"
				: network === "Discover"
				? "DC"
				: "V";

		newAcc = await Account.create({
			account_number,
			member_id,
			acc_type,
			payment_network,
			balance,
			isOpen,
		});

		return await Account.scope("selectedAccount").findByPk(newAcc.id);
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
