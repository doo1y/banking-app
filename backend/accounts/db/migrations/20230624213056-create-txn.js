"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Txns", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			txn_uuid: {
				type: Sequelize.DataTypes.UUID,
				allowNull: false,
			},
			account_id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "Accounts",
						key: "id",
					},
				},
			},
			txn_type_code: {
				type: Sequelize.DataTypes.ENUM("S", "R"),
				allowNull: false,
			},
			txn_status_code: {
				type: Sequelize.DataTypes.ENUM(
					"initiated",
					"fulfilled",
					"failed",
					"received"
				),
				allowNull: false,
			},
			txn_amount: {
				type: Sequelize.DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
			},
			notes: {
				type: Sequelize.DataTypes.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Txns");
	},
};
