"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Members", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			f_name: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			l_name: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			username: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			dob: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			ssn: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			phone: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			password_hash: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Members");
	},
};
