"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Accounts", [
			// member 1: checking account - open
			{
				account_number: "1111111111111110",
				member_id: 1,
				acc_type: "C",
				payment_network: "AMEX",
				balance: 14.55,
				isOpen: true,
				exp: "2026/02/27",
			},
			//  member 1: savings account - open
			{
				account_number: "1111111111111111",
				member_id: 1,
				acc_type: "S",
				payment_network: "V",
				balance: 5000.0,
				isOpen: true,
				exp: "2024/08/11",
			},
			// member 1: checking account - closed
			{
				account_number: "1111111111111112",
				member_id: 1,
				acc_type: "C",
				payment_network: "MC",
				balance: 0.0,
				isOpen: false,
				exp: "2025/04/20",
			},
			// member 1: certificate of deposit - open
			{
				account_number: "1111111111111113",
				member_id: 1,
				acc_type: "CD",
				payment_network: "MC",
				balance: 9948.9,
				isOpen: true,
				exp: "2026/11/15",
			},
			// member 2: checking account - open
			{
				account_number: "1111111111111114",
				member_id: 2,
				acc_type: "C",
				payment_network: "DC",
				balance: 145.85,
				isOpen: true,
				exp: "2024/02/24",
			},
			// member 2: savings account - open
			{
				account_number: "1111111111111115",
				member_id: 2,
				acc_type: "S",
				payment_network: "AMEX",
				balance: 300.0,
				isOpen: true,
				exp: "2028/02/13",
			},
			// member 3: checking account - open
			{
				account_number: "1111111111111116",
				member_id: 3,
				acc_type: "C",
				payment_network: "V",
				balance: 4.34,
				isOpen: true,
				exp: "2025/04/20",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Accounts", {
			account_number: {
				[Op.in]: [
					"1111111111111110",
					"1111111111111111",
					"1111111111111112",
					"1111111111111113",
					"1111111111111114",
					"1111111111111115",
					"1111111111111116",
				],
			},
		});
	},
};
