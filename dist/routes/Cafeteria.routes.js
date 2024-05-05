"use strict";
// cafeteria.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CafeteriaController_1 = require("../controllers/CafeteriaController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const Multer_1 = require("../middlewares/Multer");
const router = (0, express_1.Router)();
// Rutas para CRUD de cafeterías
router.get('/cafeterias', IsAdmin_1.validateToken, CafeteriaController_1.obtenerCafeterias);
router.post('/cafeterias', IsAdmin_1.validateToken, CafeteriaController_1.crearCafeteria);
router.get('/cafeterias/:id', IsAdmin_1.validateToken, CafeteriaController_1.obtenerCafeteriaPorId);
router.put('/cafeterias/:id', IsAdmin_1.validateToken, CafeteriaController_1.actualizarCafeteria);
router.delete('/cafeterias/:id', IsAdmin_1.validateToken, CafeteriaController_1.eliminarCafeteria);
// Rutas para subir y obtener imagen de cafetería
router.post('/cafeterias/:id/imagen', IsAdmin_1.validateToken, Multer_1.multerUpload.single('imagen'), CafeteriaController_1.subirImagenCafeteria);
router.get('/cafeterias/:id/imagen', IsAdmin_1.validateToken, CafeteriaController_1.obtenerImagenCafeteria);
exports.default = router;
