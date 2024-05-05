"use strict";
// proveedor.controller.ts
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
exports.deleteProveedor = exports.updateProveedor = exports.getTipoUsuarioById = exports.createProveedor = exports.getAllProveedores = void 0;
const Proovedor_1 = require("../models/Proovedor");
// Obtener todos los proveedores
const getAllProveedores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield Proovedor_1.Proveedores.findAll();
        res.json(proveedores);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los proveedores' });
    }
});
exports.getAllProveedores = getAllProveedores;
// Crear un nuevo proveedor
const createProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreComercial, rnc, fechaRegistro, estado } = req.body;
    try {
        const proveedor = yield Proovedor_1.Proveedores.create({ nombreComercial, rnc, fechaRegistro, estado });
        res.status(201).json(proveedor);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al crear el proveedor' });
    }
});
exports.createProveedor = createProveedor;
const getTipoUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proveedor = yield Proovedor_1.Proveedores.findByPk(id);
        if (!proveedor) {
            return res.status(404).json({ error: ' Proveedor no encontrado' });
        }
        res.json(proveedor);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getTipoUsuarioById = getTipoUsuarioById;
// Actualizar un proveedor por su ID
const updateProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombreComercial, rnc, fechaRegistro, estado } = req.body;
    try {
        const proveedor = yield Proovedor_1.Proveedores.findByPk(id);
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        proveedor.nombreComercial = nombreComercial;
        proveedor.rnc = rnc;
        proveedor.fechaRegistro = fechaRegistro;
        proveedor.estado = estado;
        yield proveedor.save();
        res.json(proveedor);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar el proveedor' });
    }
});
exports.updateProveedor = updateProveedor;
// Eliminar un proveedor por su ID
const deleteProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const proveedor = yield Proovedor_1.Proveedores.findByPk(id);
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        yield proveedor.destroy();
        res.json({ message: 'Proveedor eliminado correctamente' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error al eliminar el proveedor' });
    }
});
exports.deleteProveedor = deleteProveedor;
