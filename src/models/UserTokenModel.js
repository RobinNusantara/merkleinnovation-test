const { Model, DataTypes } = require("sequelize");
const { Database } = require("../infrastructure/mysql/Database");

/**
 * @typedef  {object} IUserTokenModel
 * @property {string} id
 * @property {string} userId
 * @property {string} token
 * @property {Date}   createdAt
 * @property {Date}   updatedAt
 * @property {Date}   deletedAt
 */

/** @extends {Model<IUserTokenModel>} */
class UserTokenModel extends Model {}

UserTokenModel.init(
    {
        id: {
            type: DataTypes.STRING({ length: 45 }),
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            field: "user_id",
            type: DataTypes.STRING({ length: 45 }),
            allowNull: false,
        },
        token: {
            type: DataTypes.TEXT,
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
        tableName: "user_tokens",
        modelName: "UserTokenModel",
    },
);

module.exports = UserTokenModel

