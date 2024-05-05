"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
// empleado.model.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Empleado = connection_1.default.define('Empleado', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tandaLabor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    porcientoComision: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    fechaIngreso: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.Empleado = Empleado;
