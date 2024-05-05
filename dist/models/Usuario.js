"use strict";
// usuario.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TipoUsuario_1 = require("./TipoUsuario"); // Importa el modelo de TipoUsuario
const Usuario = connection_1.default.define('Usuario', {
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
    img: {
        type: sequelize_1.DataTypes.STRING, // Suponiendo que el campo de la imagen es una URL
    },
    tipoUsuarioID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoUsuario_1.TipoUsuario, // Referencia al modelo de TipoUsuario
            key: 'id', // Clave primaria en el modelo de TipoUsuario
        },
    },
    limiteCredito: {
        type: sequelize_1.DataTypes.FLOAT,
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
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // El email debe ser único
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.Usuario = Usuario;
// Establece la relación
Usuario.belongsTo(TipoUsuario_1.TipoUsuario, { foreignKey: 'tipoUsuarioID', as: 'tipoUsuario' });
