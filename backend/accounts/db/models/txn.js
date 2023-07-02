"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Txn extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Txn.belongsTo(models.Account, { foreignKey: "account_id" });
		}
	}
	Txn.init(
		{
			txn_uuid: {
				type: DataTypes.UUID,
				validate: {
					isUUID: 4,
				},
			},
			account_id: { type: DataTypes.INTEGER },
			txn_type_code: {
				type: DataTypes.ENUM,
				values: ["S", "R"],
				validate: {
					allowNull: false,
					notEmpty: true,
				},
			},
			txn_status_code: {
				type: DataTypes.ENUM,
				values: ["initiated", "fulfilled", "failed", "received"],
				validate: {
					allowNull: false,
					notEmpty: true,
				},
			},
			txn_amount: { type: DataTypes.DECIMAL },
			notes: { type: DataTypes.TEXT },
		},
		{
			sequelize,
			modelName: "Txn",
		}
	);

	return Txn;
};
