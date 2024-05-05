"use strict";
// empleado.controller.ts
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
exports.obtenerImagenEmpleado = exports.subirImagenEmpleado = exports.exportarEmpleadosPDF = exports.eliminarEmpleado = exports.actualizarEmpleado = exports.obtenerEmpleadoPorId = exports.crearEmpleado = exports.obtenerEmpleados = void 0;
const Empleado_1 = require("../models/Empleado");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
// Obtener todos los empleados
const obtenerEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield Empleado_1.Empleado.findAll();
        res.json(empleados);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
});
exports.obtenerEmpleados = obtenerEmpleados;
// Crear un nuevo empleado
const crearEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, cedula, tandaLabor, cargo, porcientoComision, fechaIngreso, estado } = req.body;
    try {
        const empleado = yield Empleado_1.Empleado.create({
            nombre,
            cedula,
            tandaLabor,
            cargo,
            porcientoComision,
            fechaIngreso,
            estado
        });
        res.json(empleado);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al crear el empleado' });
    }
});
exports.crearEmpleado = crearEmpleado;
// Obtener un empleado por su ID
const obtenerEmpleadoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const empleado = yield Empleado_1.Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleado);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
});
exports.obtenerEmpleadoPorId = obtenerEmpleadoPorId;
// Actualizar un empleado por su ID
const actualizarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, cedula, tandaLabor, cargo, porcientoComision, fechaIngreso, estado } = req.body;
    try {
        const empleado = yield Empleado_1.Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        empleado.nombre = nombre;
        empleado.cedula = cedula;
        empleado.tandaLabor = tandaLabor;
        empleado.cargo = cargo;
        empleado.porcientoComision = porcientoComision;
        empleado.fechaIngreso = fechaIngreso;
        empleado.estado = estado;
        yield empleado.save();
        res.json(empleado);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar el empleado' });
    }
});
exports.actualizarEmpleado = actualizarEmpleado;
// Eliminar un empleado por su ID
const eliminarEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const empleado = yield Empleado_1.Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        yield empleado.destroy();
        res.json({ mensaje: 'Empleado eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
});
exports.eliminarEmpleado = eliminarEmpleado;
const exportarEmpleadosPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield Empleado_1.Empleado.findAll();
        const fileName = 'empleados.pdf';
        const folderPath = path_1.default.join(__dirname, '../../src/ReportesEmpleados');
        // Crear el directorio si no existe
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
        const filePath = path_1.default.join(folderPath, fileName);
        const pdfDoc = new pdfkit_1.default();
        pdfDoc.pipe(fs_1.default.createWriteStream(filePath));
        pdfDoc.fontSize(16).text('Lista de Empleados', { align: 'center' }).moveDown();
        empleados.forEach((empleado, index) => {
            pdfDoc.fontSize(12).text(`${index + 1}. Nombre: ${empleado.nombre}, Cédula: ${empleado.cedula}, Cargo: ${empleado.cargo},Tanda laborable: ${empleado.tandaLabor}, Comicion: ${empleado.porcientoComision}, Estado: ${empleado.estado}`);
        });
        pdfDoc.end();
        // Enviar el archivo PDF como parte de la respuesta HTTP
        res.status(200).download(filePath, fileName);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al exportar empleados a PDF' });
    }
});
exports.exportarEmpleadosPDF = exportarEmpleadosPDF;
const subirImagenEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verificar si el empleado existe
        const empleado = yield Empleado_1.Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        // Verificar si se proporcionó una imagen
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
        const nombreArchivo = `${Date.now()}${extension}`;
        const rutaArchivo = path_1.default.join(__dirname, '../../src/uploads', nombreArchivo);
        fs_1.default.renameSync(imagen.path, rutaArchivo);
        // Actualizar el campo imagen del empleado en la base de datos
        empleado.imagen = nombreArchivo;
        yield empleado.save();
        res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    }
    catch (error) {
        console.error('Error al subir la imagen del empleado:', error);
        res.status(500).json({ error: 'Error al subir la imagen del empleado' });
    }
});
exports.subirImagenEmpleado = subirImagenEmpleado;
const obtenerImagenEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const empleado = yield Empleado_1.Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrada' });
        }
        if (!empleado.imagen) {
            return res.status(404).json({ error: 'El empleado no tiene una imagen asociada' });
        }
        const rutaImagen = path_1.default.join(__dirname, '../../src/uploads', empleado.imagen);
        res.sendFile(rutaImagen);
    }
    catch (error) {
        console.error('Error al obtener la imagen del empleado:', error);
        res.status(500).json({ error: 'Error al obtener la imagen del empleado' });
    }
});
exports.obtenerImagenEmpleado = obtenerImagenEmpleado;
