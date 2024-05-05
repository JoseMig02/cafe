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
exports.eliminarCampus = exports.actualizarCampus = exports.crearCampus = exports.obtenerCampusPorId = exports.obtenerCampus = void 0;
const Campus_1 = require("../models/Campus");
// Obtener todos los campus
const obtenerCampus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campus = yield Campus_1.Campus.findAll();
        res.json(campus);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los campus' });
    }
});
exports.obtenerCampus = obtenerCampus;
// Obtener un campus por su ID
const obtenerCampusPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const campus = yield Campus_1.Campus.findByPk(id);
        if (!campus) {
            return res.status(404).json({ error: 'Campus no encontrado' });
        }
        res.json(campus);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el campus' });
    }
});
exports.obtenerCampusPorId = obtenerCampusPorId;
// Crear un nuevo campus
const crearCampus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, direccion, descripcion, estado } = req.body;
        console.log(req.body); // Imprimir los datos recibidos en la consola
        if (!nombre || !direccion || !estado) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const nuevoCampus = yield Campus_1.Campus.create({ nombre, direccion, descripcion, estado });
        res.status(201).json(nuevoCampus);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el campus' });
    }
});
exports.crearCampus = crearCampus;
// Actualizar un campus por su ID
const actualizarCampus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, direccion, descripcion, estado } = req.body;
        const campus = yield Campus_1.Campus.findByPk(id);
        if (!campus) {
            return res.status(404).json({ error: 'Campus no encontrado' });
        }
        if (!nombre || !direccion || !estado) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        yield campus.update({ nombre, direccion, descripcion, estado });
        res.json({ mensaje: 'Campus actualizado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el campus' });
    }
});
exports.actualizarCampus = actualizarCampus;
// Eliminar un campus por su ID
const eliminarCampus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const campus = yield Campus_1.Campus.findByPk(id);
        if (!campus) {
            return res.status(404).json({ error: 'Campus no encontrado' });
        }
        yield campus.destroy();
        res.json({ mensaje: 'Campus eliminado exitosamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el campus' });
    }
});
exports.eliminarCampus = eliminarCampus;
