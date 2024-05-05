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
exports.obtenerImagenusuario = exports.subirImagenUsuario = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.NewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = require("../models/Usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const NewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, cedula, tipoUsuarioID, limiteCredito, estado, username, email, password, fechaRegistro } = req.body;
    // validamos si el usuario existe en la base de datos
    const user = yield Usuario_1.Usuario.findOne({ where: {
            email: email
        } });
    if (user) {
        return res.status(400).json({
            msg: 'Correo existente'
        });
    }
    if (!nombre || !cedula || !limiteCredito || !estado || !username || !email || !password || !fechaRegistro) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        // guardamos usuario en la base de datos
        const nuevoUsuario = yield Usuario_1.Usuario.create({
            nombre,
            cedula,
            tipoUsuarioID: 7,
            limiteCredito,
            estado,
            username,
            fechaRegistro,
            email,
            password: hashedPassword,
        });
        const idUsuario = nuevoUsuario.getDataValue("id");
        console.log(idUsuario);
        res.json({
            msg: 'Usuario ' + nombre + ' creado exitossamente',
            idUsuario: idUsuario,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'ocurrio un error',
            error
        });
    }
});
exports.NewUser = NewUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //validamos si el usuario existe en la bbdd
    const user = yield Usuario_1.Usuario.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({
            msg: 'No exixte un usuario con el correo ' + email + ' en la Base de datos'
        });
    }
    //validamos password
    const passworvalid = yield bcrypt_1.default.compare(password, user.password);
    if (!passworvalid) {
        return res.status(400).json({
            msg: 'Password Incorrecta'
        });
    }
    //generamos token
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        tipoUsuarioID: user.tipoUsuarioID,
        username: user.username
    }, process.env.SECRET_KEY || 'pepito123', {
    //  expiresIn:'10000'
    });
    return res.status(200).json(token);
});
exports.loginUser = loginUser;
// Obtener todos los usuarios
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.Usuario.findAll();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getAllUsers = getAllUsers;
// Obtener un usuario por su ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const usuario = yield Usuario_1.Usuario.findByPk(userId);
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUserById = getUserById;
// Actualizar un usuario por su ID
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, cedula, tipoUsuarioID, limiteCredito, estado, username, fechaRegistro, email, password } = req.body;
    try {
        const usuario = yield Usuario_1.Usuario.findByPk(id);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (usuario) {
            yield usuario.update({
                nombre,
                cedula,
                tipoUsuarioID,
                limiteCredito,
                estado,
                username,
                fechaRegistro,
                email,
                password: hashedPassword
            });
            res.json({ message: 'Usuario actualizado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateUserById = updateUserById;
// Eliminar un usuario por su ID
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const usuario = yield Usuario_1.Usuario.findByPk(userId);
        if (usuario) {
            yield usuario.destroy();
            res.json({ message: 'Usuario eliminado correctamente' });
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteUserById = deleteUserById;
const subirImagenUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verificar si el empleado existe
        const usuario = yield Usuario_1.Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
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
        usuario.img = nombreArchivo;
        yield usuario.save();
        res.json({ mensaje: 'Imagen subida correctamente', nombreArchivo });
    }
    catch (error) {
        console.error('Error al subir la imagen del usuario:', error);
        res.status(500).json({ error: 'Error al subir la imagen del usuario' });
    }
});
exports.subirImagenUsuario = subirImagenUsuario;
const obtenerImagenusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield Usuario_1.Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'usuario no encontrada' });
        }
        if (!usuario.img) {
            return res.status(404).json({ msg: 'El usuario no tiene una imagen asociada' });
        }
        const rutaImagen = path_1.default.join(__dirname, '../../src/uploads', usuario.img);
        res.sendFile(rutaImagen);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen del usuario' });
    }
});
exports.obtenerImagenusuario = obtenerImagenusuario;
