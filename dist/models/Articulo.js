"use strict";
// articulo.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Marca_1 = require("./Marca"); // Importa el modelo de Marca
const Proovedor_1 = require("./Proovedor"); // Importa el modelo de Proveedor
const Articulo = connection_1.default.define('Articulo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    marcaID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Marca_1.Marca, // Referencia al modelo de Marca
            key: 'id', // Clave primaria en el modelo de Marca
        },
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    proveedorID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proovedor_1.Proveedores, // Referencia al modelo de Proveedor
            key: 'id', // Clave primaria en el modelo de Proveedor
        },
    },
    existencia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.STRING, // Suponiendo que el campo de la imagen es una URL
    },
});
exports.Articulo = Articulo;
// Establece las relaciones
Articulo.belongsTo(Marca_1.Marca, { foreignKey: 'marcaID', as: 'marca' });
Articulo.belongsTo(Proovedor_1.Proveedores, { foreignKey: 'proveedorID', as: 'proveedores' });
