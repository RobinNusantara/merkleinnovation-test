const cors = require("cors");

module.exports = {
    cors: cors({
        origin: "*",
        allowedHeaders: "*",
        methods: ["GET, POST, PUT, DELETE, PATCH, OPTIONS"],
    }),
};