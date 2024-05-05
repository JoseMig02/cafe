"use strict";
// proveedor.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedores = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Proveedores = connection_1.default.define('Proveedores', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreComercial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rnc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fechaRegistro: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Proveedores = Proveedores;
