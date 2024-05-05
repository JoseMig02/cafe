"use strict";
// cafeteria.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cafeteria = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Campus_1 = require("./Campus"); // Importa el modelo de Campus
const Cafeteria = connection_1.default.define('Cafeteria', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    campusID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Campus_1.Campus, // Referencia al modelo de Campus
            key: 'id', // Clave primaria en el modelo de Campus
        },
    },
    encargado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.Cafeteria = Cafeteria;
// Establece la relación
Cafeteria.belongsTo(Campus_1.Campus, { foreignKey: 'campusID', as: 'campus' });
