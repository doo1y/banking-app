"use strict";
const bcrypt = require("bcryptjs");

const { Sequelize, Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Member extends Model {
		static Associate(models) {
			Member.hasMany(models.Account, { foreignKey: "member_id" });
		}
	}

	Member.init(
		{
			f_name: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [1, 30],
					notNull: {
						msg: "Please enter your first name",
					},
				},
			},
			l_name: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [1, 30],
					notNull: {
						msg: "Please enter last name",
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			dob: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isDate: true,
					isBefore: (function () {
						var dateObj = new Date();
						var m = dateObj.getUTCMonth();
						var d = dateObj.getUTCDate();
						var y = dateObj.getUTCFullYear();
						return m + "-" + d + "-" + y;
					})(),
				},
			},
			ssn: { type: DataTypes.TEXT, allowNull: false, unique: true },
			email: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [3, 256],
					notNull: {
						msg: "Please enter your email",
					},
				},
			},
			phone: { type: DataTypes.TEXT, allowNull: false },
			password_hash: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: [
						"password_hash",
						"ssn",
						"email",
						"dob",
						"createdAt",
						"updatedAt",
					],
				},
			},
			scopes: {
				currentMember: { attributes: { exclude: ["password_hash"] } },
				loginMember: { attributes: {} },
			},
			sequelize,
			modelName: "Member",
		}
	);

	Member.prototype.toSafeObject = function () {
		const { id, username, email, f_name, l_name, phone, createdAt } = this;
		return { id, username, email, f_name, l_name, phone, createdAt };
	};

	Member.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.password_hash.toString());
	};

	Member.getCurrentMemberById = async function (id) {
		return await Member.scope("currentMember").findByPk(id);
	};

	Member.login = async function ({ credential, password }) {
		const { Op } = require("sequelize");
		const member = await Member.scope("loginMember").findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (member && member.validatePassword(password)) {
			return await Member.scope("currentMember").findByPk(member.id);
		}
	};

	Member.signup = async function ({
		f_name,
		l_name,
		ssn,
		dob,
		username,
		email,
		phone,
		password,
	}) {
		const password_hash = bcrypt.hashSync(password);
		const member = await Member.create({
			f_name,
			l_name,
			ssn,
			dob,
			phone,
			username,
			email,
			password_hash,
		});

		return await Member.scope("currentMember").findByPk(member.id);
	};

	return Member;
};
