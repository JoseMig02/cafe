"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de multer para subir archivos
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../src/uploads')); // Define la carpeta de destino de los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Define el nombre del archivo
    },
});
// Middleware de multer para cargar archivos
const multerUpload = (0, multer_1.default)({ storage: multerStorage });
exports.multerUpload = multerUpload;
