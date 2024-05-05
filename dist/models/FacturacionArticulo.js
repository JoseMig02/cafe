"use strict";
// facturacionArticulos.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturacionArticulos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Empleado_1 = require("./Empleado");
const Articulo_1 = require("./Articulo");
const Usuario_1 = require("./Usuario");
const Campus_1 = require("./Campus");
const Cafeteria_1 = require("./Cafeteria");
const FacturacionArticulos = connection_1.default.define('FacturacionArticulos', {
    noFactura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    empleadoID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Empleado_1.Empleado, // Referencia al modelo de Empleado
            key: 'id', // Clave primaria en el modelo de Empleado
        },
    },
    articuloID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Articulo_1.Articulo, // Referencia al modelo de Articulo
            key: 'id', // Clave primaria en el modelo de Articulo
        },
    },
    usuarioID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario_1.Usuario, // Referencia al modelo de Usuario
            key: 'id', // Clave primaria en el modelo de Usuario
        },
    },
    campusID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Campus_1.Campus, // Referencia al modelo de Campus
            key: 'id', // Clave primaria en el modelo de Campus
        },
    },
    cafeteriaID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cafeteria_1.Cafeteria, // Referencia al modelo de Cafeteria
            key: 'id', // Clave primaria en el modelo de Cafeteria
        },
    },
    fechaVenta: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    montoArticulo: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    Total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    unidadesVendidas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.FacturacionArticulos = FacturacionArticulos;
FacturacionArticulos.belongsTo(Empleado_1.Empleado, { foreignKey: 'empleadoID', as: 'empleado' });
FacturacionArticulos.belongsTo(Articulo_1.Articulo, { foreignKey: 'articuloID', as: 'articulo' });
FacturacionArticulos.belongsTo(Usuario_1.Usuario, { foreignKey: 'usuarioID', as: 'usuario' });
FacturacionArticulos.belongsTo(Campus_1.Campus, { foreignKey: 'campusID', as: 'campus' });
FacturacionArticulos.belongsTo(Cafeteria_1.Cafeteria, { foreignKey: 'cafeteriaID', as: 'cafeteria' });
