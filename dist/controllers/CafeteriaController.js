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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerImagenCafeteria = exports.subirImagenCafeteria = exports.eliminarCafeteria = exports.actualizarCafeteria = exports.obtenerCafeteriaPorId = exports.crearCafeteria = exports.obtenerCafeterias = void 0;
const Cafeteria_1 = require("../models/Cafeteria");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Obtener todas las cafeterías
const obtenerCafeterias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cafeterias = yield Cafeteria_1.Cafeteria.findAll();
        res.json(cafeterias);
    }
    catch (error) {
        console.error('Error al obtener las cafeterías:', error);
        res.status(500).json({ error: 'Error al obtener las cafeterías' });
    }
});
exports.obtenerCafeterias = obtenerCafeterias;
// Crear una nueva cafetería
const crearCafeteria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, campusID, encargado, estado, nombre, direccion, telefono } = req.body;
        if (!descripcion || !campusID || !encargado || !estado || !nombre || !direccion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const nuevaCafeteria = yield Cafeteria_1.Cafeteria.create({
            descripcion,
            campusID,
            encargado,
            estado,
            nombre,
            direccion,
            telefono,
        });
        res.status(201).json(nuevaCafeteria);
    }
    catch (error) {
        console.error('Error al crear la cafetería:', error);
        res.status(500).json({ error: 'Error al crear la cafetería' });
    }
});
exports.crearCafeteria = crearCafeteria;
// Obtener una cafetería por su ID
const obtenerCafeteriaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cafeteria = yield Cafeteria_1.Cafeteria.findByPk(id);
        if (!cafeteria) {
            return res.status(404).json({ error: 'Cafetería no encontrada' });
        }
        res.json(cafeteria);
    }
    catch (error) {
        console.error('Error al obtener la cafetería:', error);
        res.status(500).json({ error: 'Error al obtener la cafetería' });
    }
});
exports.obtenerCafeteriaPorId = obtenerCafeteriaPorId;
// Actualizar una cafetería por su ID
const actualizarCafeteria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { descripcion, campusID, encargado, estado, nombre, direccion, telefono } = req.body;
        const cafeteria = yield Cafeteria_1.Cafeteria.findByPk(id);
        if (!cafeteria) {
            return res.status(404).json({ error: 'Cafetería no encontrada' });
        }
        yield cafeteria.update({ descripcion, campusID, encargado, estado, nombre, direccion, telefono, });
        res.json({ mensaje: 'Cafetería actualizada correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar la cafetería:', error);
        res.status(500).json({ error: 'Error al actualizar la cafetería' });
    }
});
exports.actualizarCafeteria = actualizarCafeteria;
// Eliminar una cafetería por su ID
const eliminarCafeteria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const numFilasEliminadas = yield Cafeteria_1.Cafeteria.destroy({ where: { id } });
        if (numFilasEliminadas === 0) {
            return res.status(404).json({ error: 'Cafetería no encontrada' });
        }
        res.json({ mensaje: 'Cafetería eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la cafetería:', error);
        res.status(500).json({ error: 'Error al eliminar la cafetería' });
    }
});
exports.eliminarCafeteria = eliminarCafeteria;
// Subir imagen de cafetería
const subirImagenCafeteria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cafeteria = yield Cafeteria_1.Cafeteria.findByPk(id);
        if (!cafeteria) {
            return res.status(404).json({ error: 'Cafetería no encontrada' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }
        const imagen = req.file;
        // Validar la extensión del archivo
        const extension = path_1.default.extname(imagen.originalname).toLowerCase();
        if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            fs_1.default.unlinkSync(imagen.path); // Eliminar archivo no válido
            return res.status(400).json({ error: 'La imagen debe ser de tipo PNG o JPG' });
        }
        // Guardar la imagen en el servidor
        const nombreArchivo = `${Date.now()}-${imagen.originalname}`;
        const rutaArchivo = path_1.default.join(__dirname, '../../src/uploads', nombreArchivo);
        fs_1.default.renameSync(imagen.path, rutaArchivo);
        // Actualizar la ruta de la imagen en la base de datos
        cafeteria.img = nombreArchivo;
        yield cafeteria.save();
        res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    }
    catch (error) {
        console.error('Error al subir la imagen de la cafetería:', error);
        res.status(500).json({ error: 'Error al subir la imagen de la cafetería' });
    }
});
exports.subirImagenCafeteria = subirImagenCafeteria;
// Obtener imagen de cafetería por su ID
const obtenerImagenCafeteria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cafeteria = yield Cafeteria_1.Cafeteria.findByPk(id);
        if (!cafeteria) {
            return res.status(404).json({ error: 'Cafetería no encontrada' });
        }
        if (!cafeteria.img) {
            return res.status(404).json({ error: 'La cafetería no tiene una imagen asociada' });
        }
        const rutaImagen = path_1.default.join(__dirname, '../../src/uploads', cafeteria.img);
        res.sendFile(rutaImagen);
    }
    catch (error) {
        console.error('Error al obtener la imagen de la cafetería:', error);
        res.status(500).json({ error: 'Error al obtener la imagen de la cafetería' });
    }
});
exports.obtenerImagenCafeteria = obtenerImagenCafeteria;
