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
exports.obtenerImagenArticulo = exports.subirImagenArticulo = exports.eliminarArticulo = exports.actualizarArticulo = exports.obtenerArticuloPorId = exports.obtenerArticulos = exports.crearArticulo = void 0;
const Articulo_1 = require("../models/Articulo");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Método para crear un nuevo artículo
const crearArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, marcaID, precio, proveedorID, existencia, estado } = req.body;
        if (!nombre || !marcaID || !precio || !proveedorID || !existencia || !estado) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        // Crear el nuevo artículo en la base de datos
        const nuevoArticulo = yield Articulo_1.Articulo.create({ nombre, descripcion, marcaID, precio, proveedorID, existencia, estado });
        res.status(201).json(nuevoArticulo);
    }
    catch (error) {
        console.error('Error al crear el artículo:', error);
        res.status(500).json({ error: 'Error al crear el artículo' });
    }
});
exports.crearArticulo = crearArticulo;
// Método para obtener todos los artículos
const obtenerArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield Articulo_1.Articulo.findAll();
        res.json(articulos);
    }
    catch (error) {
        console.error('Error al obtener los artículos:', error);
        res.status(500).json({ error: 'Error al obtener los artículos' });
    }
});
exports.obtenerArticulos = obtenerArticulos;
// Método para obtener un artículo por su ID
const obtenerArticuloPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const articulo = yield Articulo_1.Articulo.findByPk(id);
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        res.json(articulo);
    }
    catch (error) {
        console.error('Error al obtener el artículo:', error);
        res.status(500).json({ error: 'Error al obtener el artículo' });
    }
});
exports.obtenerArticuloPorId = obtenerArticuloPorId;
// Método para actualizar un artículo por su ID
const actualizarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const articulo = yield Articulo_1.Articulo.findByPk(id);
        if (!articulo) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        // Actualizar los campos del artículo si se proporcionan en el cuerpo de la solicitud
        const { nombre, descripcion, marcaID, precio, proveedorID, existencia, estado } = req.body;
        if (nombre)
            articulo.nombre = nombre;
        if (descripcion)
            articulo.descripcion = descripcion;
        if (marcaID)
            articulo.marcaID = marcaID;
        if (precio)
            articulo.precio = precio;
        if (proveedorID)
            articulo.proveedorID = proveedorID;
        if (existencia)
            articulo.existencia = existencia;
        if (estado)
            articulo.estado = estado;
        // Guardar los cambios en la base de datos
        yield articulo.save();
        res.json(articulo);
    }
    catch (error) {
        console.error('Error al actualizar el artículo:', error);
        res.status(500).json({ error: 'Error al actualizar el artículo' });
    }
});
exports.actualizarArticulo = actualizarArticulo;
// Método para eliminar un artículo por su ID
const eliminarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const numFilasEliminadas = yield Articulo_1.Articulo.destroy({ where: { id } });
        if (numFilasEliminadas === 0) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        res.json({ mensaje: 'Artículo eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar el artículo:', error);
        res.status(500).json({ error: 'Error al eliminar el artículo' });
    }
});
exports.eliminarArticulo = eliminarArticulo;
// Método para subir una imagen del artículo
const subirImagenArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verificar si el empleado existe
        const articulo = yield Articulo_1.Articulo.findByPk(id);
        if (!articulo) {
            return res.status(404).json({ error: 'Articulo no encontrado' });
        }
        // Verificar si se proporcionó una imagen
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
        }
        const imagen = req.file;
        console.log(req.file);
        // Validar la extensión del archivo
        const extension = path_1.default.extname(imagen.originalname).toLowerCase();
        if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg') {
            fs_1.default.unlinkSync(imagen.path); // Eliminar archivo no válido
            return res.status(400).json({ error: 'La imagen debe ser de tipo PNG o JPG' });
        }
        // Guardar la imagen en el servidor
        const nombreArchivo = `${Date.now()}${extension}`;
        const rutaArchivo = path_1.default.join(__dirname, '../../src/uploads', nombreArchivo);
        fs_1.default.renameSync(imagen.path, rutaArchivo);
        // Actualizar el campo imagen del empleado en la base de datos
        articulo.img = nombreArchivo;
        yield articulo.save();
        res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    }
    catch (error) {
        console.error('Error al subir la imagen del del articulo:', error);
        res.status(500).json({ error: 'Error al subir la imagen del articulo' });
    }
});
exports.subirImagenArticulo = subirImagenArticulo;
const obtenerImagenArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articulo = yield Articulo_1.Articulo.findByPk(id);
        if (!articulo) {
            return res.status(404).json({ error: 'Articulo no encontrada' });
        }
        if (!articulo.img) {
            return res.status(404).json({ error: 'El articulo no tiene una imagen asociada' });
        }
        const rutaImagen = path_1.default.join(__dirname, '../../src/uploads', articulo.img);
        res.sendFile(rutaImagen);
    }
    catch (error) {
        console.error('Error al obtener la imagen del articulo:', error);
        res.status(500).json({ error: 'Error al obtener la imagen del articulo' });
    }
});
exports.obtenerImagenArticulo = obtenerImagenArticulo;
