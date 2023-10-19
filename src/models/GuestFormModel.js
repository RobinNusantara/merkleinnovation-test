const { Model, DataTypes } = require("sequelize");
const { Database } = require("../infrastructure/mysql/Database");

/**
 * @typedef  {object} IGuestFormModel
 * @property {number} id
 * @property {string} name
 * @property {string} address
 * @property {string} phoneNumber
 * @property {string} notes
 * @property {Date}   createdAt
 * @property {Date}   updatedAt
 * @property {Date}   deletedAt
 */

/** @extends {Model<IGuestFormModel>} */
class GuestFormModel extends Model {}

GuestFormModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING({ length: 255 }),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING({ length: 255 }),
            allowNull: false,
        },
        phoneNumber: {
            field: "phone_number",
            type: DataTypes.STRING({ length: 255 }),
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            field: "created_at",
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            field: "updated_at",
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            field: "deleted_at",
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: Database,
        tableName: "guest_forms",
        modelName: "GuestFormModel",
    },
);

module.exports = GuestFormModel;
