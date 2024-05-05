"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticulosController_1 = require("../controllers/ArticulosController");
const Multer_1 = require("../middlewares/Multer");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = (0, express_1.Router)();
// Rutas para CRUD de artículos
router.get('/articulos', IsAdmin_1.validateToken, ArticulosController_1.obtenerArticulos);
router.post('/articulos', IsAdmin_1.validateToken, ArticulosController_1.crearArticulo);
router.get('/articulos/:id', IsAdmin_1.validateToken, ArticulosController_1.obtenerArticuloPorId);
router.put('/articulos/:id', IsAdmin_1.validateToken, ArticulosController_1.actualizarArticulo);
router.delete('/articulos/:id', IsAdmin_1.validateToken, ArticulosController_1.eliminarArticulo);
router.post('/articulos/:id/imagen', IsAdmin_1.validateToken, Multer_1.multerUpload.single('imagen'), ArticulosController_1.subirImagenArticulo);
router.get('/articulos/:id/imagen', IsAdmin_1.validateToken, ArticulosController_1.obtenerImagenArticulo);
exports.default = router;
