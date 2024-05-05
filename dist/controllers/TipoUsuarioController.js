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
exports.deleteTipoUsuario = exports.updateTipoUsuario = exports.getTipoUsuarioById = exports.createTipoUsuario = exports.getAllTipoUsuarios = void 0;
const TipoUsuario_1 = require("..//models/TipoUsuario");
// Obtener todos los tipos de usuario
const getAllTipoUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoUsuarios = yield TipoUsuario_1.TipoUsuario.findAll();
        res.json(tipoUsuarios);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllTipoUsuarios = getAllTipoUsuarios;
// Crear un nuevo tipo de usuario
const createTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, estado } = req.body;
    try {
        const tipoUsuario = yield TipoUsuario_1.TipoUsuario.create({ nombre, descripcion, estado });
        res.json(tipoUsuario);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createTipoUsuario = createTipoUsuario;
// Obtener un tipo de usuario por su ID
const getTipoUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoUsuario = yield TipoUsuario_1.TipoUsuario.findByPk(id);
        if (!tipoUsuario) {
            return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
        }
        res.json(tipoUsuario);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getTipoUsuarioById = getTipoUsuarioById;
const updateTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    try {
        // Buscar el tipo de usuario por su ID
        const tipoUsuario = yield TipoUsuario_1.TipoUsuario.findByPk(id);
        if (!tipoUsuario) {
            return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
        }
        // Actualizar las propiedades del tipo de usuario
        tipoUsuario.nombre = nombre;
        tipoUsuario.descripcion = descripcion;
        tipoUsuario.estado = estado;
        // Guardar los cambios en la base de datos
        yield tipoUsuario.save();
        // Responder con el tipo de usuario actualizado
        res.json(tipoUsuario);
    }
    catch (error) {
        // Capturar errores y responder con un mensaje de error
        res.status(400).json({ error });
    }
});
exports.updateTipoUsuario = updateTipoUsuario;
// Eliminar un tipo de usuario por su ID
const deleteTipoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoUsuario = yield TipoUsuario_1.TipoUsuario.findByPk(id);
        if (!tipoUsuario) {
            return res.status(404).json({ error: 'Tipo de usuario no encontrado' });
        }
        yield tipoUsuario.destroy();
        res.json({ message: 'Tipo de usuario eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteTipoUsuario = deleteTipoUsuario;
