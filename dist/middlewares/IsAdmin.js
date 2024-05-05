"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headertoken = req.headers['authorization'];
    if (headertoken != undefined && headertoken.startsWith('Bearer')) {
        try {
            const bearerToken = headertoken.slice(7);
            const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            // Guardar la información del usuario en req
            req.user = decodedToken;
            console.log(req.user);
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            });
        }
    }
    else {
        res.status(401).json('Acceso denegado');
    }
};
exports.validateToken = validateToken;
const isAdmin = (req, res, next) => {
    // Verificar si el usuario es administrador
    const user = req.user; // Obtenemos la información del usuario guardada en req
    if (user && user.tipoUsuarioID === 5) {
        // Si el usuario es administrador, pasamos al siguiente middleware
        next();
    }
    else {
        // Si el usuario no es administrador, devolvemos un error de autorización
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere permisos de administrador.'
        });
    }
};
exports.isAdmin = isAdmin;
