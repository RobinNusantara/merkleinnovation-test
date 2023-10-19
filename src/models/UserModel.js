const { Model, DataTypes } = require("sequelize");
const { Database } = require("../infrastructure/mysql/Database");

/**
 * @typedef  {object} IUserModel
 * @property {string} id
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {Date}   createdAt
 * @property {Date}   updatedAt
 * @property {Date}   deletedAt
 */

/** @extends {Model<IUserModel>} */
class UserModel extends Model {}

UserModel.init(
    {
        id: {
            type: DataTypes.STRING({ length: 45 }),
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING({ length: 255 }),
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING({ length: 255 }),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING({ length: 255 }),
            allowNull: false,
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
        tableName: "users",
        modelName: "userModel",
    },
);

module.exports = UserModel;
