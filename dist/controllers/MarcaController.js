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
exports.deleteMarca = exports.updateMarca = exports.createMarca = exports.obtenerMarcaPorId = exports.obtenerMarcas = void 0;
const Marca_1 = require("../models/Marca");
// Obtener todas las marcas
const obtenerMarcas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcas = yield Marca_1.Marca.findAll();
        res.json(marcas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las marcas' });
    }
});
exports.obtenerMarcas = obtenerMarcas;
// Obtener una marca por su ID
const obtenerMarcaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield Marca_1.Marca.findByPk(id);
        if (!marca || marca == undefined || marca == null) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }
        res.json(marca);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener la marca' });
    }
});
exports.obtenerMarcaPorId = obtenerMarcaPorId;
const createMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, estado } = req.body;
    try {
        const marca = yield Marca_1.Marca.create({ nombre, descripcion, estado });
        res.status(201).json(marca);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al crear una marca' });
    }
});
exports.createMarca = createMarca;
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    try {
        const marca = yield Marca_1.Marca.findByPk(id);
        if (!marca) {
            return res.status(404).json({ error: ' marca no encontrada' });
        }
        marca.nombre = nombre;
        marca.descripcion = descripcion;
        marca.estado = estado;
        yield marca.save();
        res.json(marca);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar la marca' });
    }
});
exports.updateMarca = updateMarca;
// Eliminar un proveedor por su ID
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield Marca_1.Marca.findByPk(id);
        if (!marca) {
            return res.status(404).json({ error: 'Marca no encontrada' });
        }
        yield marca.destroy();
        res.json({ message: 'Marca eliminada correctamente' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error al eliminar una Marca' });
    }
});
exports.deleteMarca = deleteMarca;
