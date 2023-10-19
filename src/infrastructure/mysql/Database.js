const { Sequelize } = require("sequelize");

const Database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: {
            connectTimeout: 30000,
        },
        logging: false,
    },
);

module.exports = { Database };