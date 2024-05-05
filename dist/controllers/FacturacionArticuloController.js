"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarReporteDeRentas = exports.getVentasPorCampus = exports.getVentasPorFecha = exports.getVentasPorUsuario = exports.deleteFacturacionArticuloById = exports.updateFacturacionArticuloById = exports.createFacturacionArticulo = exports.getFacturacionArticuloById = exports.getAllFacturacionArticulos = void 0;
const FacturacionArticulo_1 = require("../models/FacturacionArticulo");
const Articulo_1 = require("../models/Articulo");
const sequelize_1 = require("sequelize");
const Usuario_1 = require("../models/Usuario");
const Cafeteria_1 = require("../models/Cafeteria");
const Campus_1 = require("../models/Campus");
const Empleado_1 = require("../models/Empleado");
// Obtener todas las facturas de artículos
const getAllFacturacionArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facturas = yield FacturacionArticulo_1.FacturacionArticulos.findAll();
        res.json(facturas);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllFacturacionArticulos = getAllFacturacionArticulos;
// Obtener una factura de artículo por su ID
const getFacturacionArticuloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const factura = yield FacturacionArticulo_1.FacturacionArticulos.findByPk(id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }
        res.json(factura);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getFacturacionArticuloById = getFacturacionArticuloById;
// Crear una nueva factura de artículo
const createFacturacionArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleadoID, articuloID, usuarioID, campusID, cafeteriaID, fechaVenta, unidadesVendidas, comentario, estado } = req.body;
    // Validar la presencia de campos obligatorios
    if (!empleadoID || !articuloID || !usuarioID || !campusID || !cafeteriaID || !fechaVenta || !unidadesVendidas || !comentario || !estado) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        // Obtener el precio del artículo
        const articulo = yield Articulo_1.Articulo.findByPk(articuloID);
        if (!articulo) {
            return res.status(404).json({ error: 'El artículo no existe' });
        }
        const usuario = yield Usuario_1.Usuario.findByPk(usuarioID);
        if (!usuario) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }
        const cafeteria = yield Cafeteria_1.Cafeteria.findByPk(cafeteriaID);
        if (!cafeteria) {
            return res.status(404).json({ error: 'La cafeteria no existe' });
        }
        const campus = Campus_1.Campus.findByPk(campusID);
        if (!campus) {
            return res.status(404).json({ error: 'Campus no encontrado' });
        }
        const empleado = Empleado_1.Empleado.findByPk(empleadoID);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        // Calcular el monto del artículo y el total
        const montoArticulo = articulo.precio;
        const Total = montoArticulo * unidadesVendidas;
        // Crear la factura con los datos proporcionados
        const facturaCreada = yield FacturacionArticulo_1.FacturacionArticulos.create({
            empleadoID,
            articuloID,
            usuarioID,
            campusID,
            cafeteriaID,
            fechaVenta,
            montoArticulo,
            unidadesVendidas,
            Total, // Agregar el total calculado
            comentario,
            estado
        });
        res.status(201).json(facturaCreada);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createFacturacionArticulo = createFacturacionArticulo;
// Actualizar una factura de artículo por su ID
const updateFacturacionArticuloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { empleadoID, articuloID, usuarioID, campusID, cafeteriaID, fechaVenta, unidadesVendidas, comentario, estado } = req.body;
    // Validar la presencia de campos obligatorios
    if (!empleadoID || !articuloID || !usuarioID || !campusID || !cafeteriaID || !fechaVenta || !unidadesVendidas || !comentario || !estado) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        // Verificar si la factura de artículo existe
        const facturaExistente = yield FacturacionArticulo_1.FacturacionArticulos.findByPk(id);
        if (!facturaExistente) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }
        // Obtener el precio del artículo
        const articulo = yield Articulo_1.Articulo.findByPk(articuloID);
        if (!articulo) {
            return res.status(404).json({ error: 'El artículo no existe' });
        }
        // Calcular el monto del artículo y el total
        const montoArticulo = articulo.precio;
        const Total = montoArticulo * unidadesVendidas;
        // Actualizar la factura con los datos proporcionados
        yield facturaExistente.update({
            empleadoID,
            articuloID,
            usuarioID,
            campusID,
            cafeteriaID,
            fechaVenta,
            montoArticulo,
            unidadesVendidas,
            Total, // Actualizar el total calculado
            comentario,
            estado
        });
        res.json({ message: 'Factura de artículo actualizada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateFacturacionArticuloById = updateFacturacionArticuloById;
// Eliminar una factura de artículo por su ID
const deleteFacturacionArticuloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const resultado = yield FacturacionArticulo_1.FacturacionArticulos.destroy({
            where: { noFactura: id }
        });
        if (!resultado) {
            return res.status(404).json({ message: 'Factura de artículo no encontrada' });
        }
        res.json({ message: 'Factura de artículo eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteFacturacionArticuloById = deleteFacturacionArticuloById;
// Consulta de ventas por usuario
const getVentasPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioID } = req.params;
    try {
        const ventas = yield FacturacionArticulo_1.FacturacionArticulos.findAll({
            where: { usuarioID }
        });
        res.json(ventas);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getVentasPorUsuario = getVentasPorUsuario;
// Consulta de ventas por fecha
const getVentasPorFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const ventas = yield FacturacionArticulo_1.FacturacionArticulos.findAll({
            where: {
                fechaVenta: {
                    [sequelize_1.Op.between]: [fechaInicio, fechaFin]
                }
            }
        });
        res.json(ventas);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getVentasPorFecha = getVentasPorFecha;
// Consulta de ventas por campus
const getVentasPorCampus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { campusID } = req.params;
    try {
        const ventas = yield FacturacionArticulo_1.FacturacionArticulos.findAll({
            where: { campusID }
        });
        res.json(ventas);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getVentasPorCampus = getVentasPorCampus;
// Reporte de rentas entre fechas y por campus
const generarReporteDeRentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaInicio, fechaFin, campusID } = req.query;
    try {
        const rentas = yield FacturacionArticulo_1.FacturacionArticulos.findAll({
            where: {
                fechaVenta: {
                    [sequelize_1.Op.between]: [fechaInicio, fechaFin]
                },
                campusID
            }
        });
        res.json(rentas);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.generarReporteDeRentas = generarReporteDeRentas;
