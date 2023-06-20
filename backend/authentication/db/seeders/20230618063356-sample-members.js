"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Members",
			[
				{
					f_name: "Samuel",
					l_name: "Park",
					username: "sampark81",
					dob: "11-14-1997",
					ssn: "111111111",
					email: "sampark@example.com",
					phone: "7141111111",
					password_hash: bcrypt.hashSync("badpassword"),
				},
				{
					f_name: "Bob",
					l_name: "Anderson",
					username: "bobanderson87",
					dob: "08-05-1987",
					ssn: "222222222",
					email: "bobanderson@example.com",
					phone: "7142222222",
					password_hash: bcrypt.hashSync("worsepassword"),
				},
				{
					f_name: "Jane",
					l_name: "Doe",
					username: "janedoe93",
					dob: "02-21-1993",
					ssn: "333333333",
					email: "janedoe@example.com",
					phone: "7143333333",
					password_hash: bcrypt.hashSync("worstpassword"),
				},
			],
			{}
			/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Members",
			{
				email: {
					[Op.in]: [
						"sampark@example.com",
						"bobanderson@example.com",
						"janedoe@example.com",
					],
				},
			},
			{}
		);
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	},
};
