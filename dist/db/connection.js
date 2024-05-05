"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
        }
    },
    database: 'Cafeteriaaa',
    username: 'jose',
    password: 'Marti@nene02',
    host: 'servidorcafe.database.windows.net',
    port: 1433,
});
exports.default = sequelize;
