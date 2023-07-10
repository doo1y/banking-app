"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Accounts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			account_number: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
				unique: true,
			},
			member_id: {
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: {
						tableName: "Members",
					},
					key: "id",
				},
				allowNull: false,
			},
			acc_type: {
				/* 
          C - Checking
          S - Savings
          CD - Certificate of Deposit
          MMA - Money Market Account
        */
				type: Sequelize.DataTypes.ENUM("C", "S", "CD", "MMA"),
				allowNull: false,
			},
			payment_network: {
				/* 
          V - VISA
          MC - MasterCard
          AMEX - AMERICAN EXPRESS
          DC - DISCOVERY
        */
				type: Sequelize.DataTypes.ENUM("V", "MC", "AMEX", "DC"),
				allowNull: false,
			},
			balance: {
				type: Sequelize.DataTypes.DECIMAL,
				defaultValue: 0.0,
			},
			isOpen: {
				type: Sequelize.DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			exp: {
				type: Sequelize.DataTypes.DATE,
				alloywNull: false,
				// sets the default value of exp date to two years starting from now
				defaultValue: new Date(
					new Date().setFullYear(new Date().getFullYear() + 2)
				),
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Accounts");
	},
};
