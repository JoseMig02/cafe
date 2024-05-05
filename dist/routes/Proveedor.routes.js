"use strict";
// proveedor.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProveedoreController_1 = require("../controllers/ProveedoreController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = express_1.default.Router();
// Rutas para los proveedores
router.get('/proveedores', IsAdmin_1.validateToken, ProveedoreController_1.getAllProveedores);
router.post('/proveedores', IsAdmin_1.validateToken, ProveedoreController_1.createProveedor);
router.get('/proveedores/:id', IsAdmin_1.validateToken, ProveedoreController_1.getTipoUsuarioById);
router.put('/proveedores/:id', IsAdmin_1.validateToken, ProveedoreController_1.updateProveedor);
router.delete('/proveedores/:id', IsAdmin_1.validateToken, ProveedoreController_1.deleteProveedor);
exports.default = router;
