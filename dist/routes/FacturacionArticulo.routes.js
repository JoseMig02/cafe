"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FacturacionArticuloController_1 = require("../controllers/FacturacionArticuloController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = (0, express_1.Router)();
// Rutas CRUD para FacturacionArticulos
router.get('/FacturacionArticulo', IsAdmin_1.validateToken, FacturacionArticuloController_1.getAllFacturacionArticulos);
router.get('/FacturacionArticulo/:id', IsAdmin_1.validateToken, FacturacionArticuloController_1.getFacturacionArticuloById);
router.post('/FacturacionArticulo', IsAdmin_1.validateToken, FacturacionArticuloController_1.createFacturacionArticulo);
router.put('/FacturacionArticulo/:id', IsAdmin_1.validateToken, FacturacionArticuloController_1.updateFacturacionArticuloById);
router.delete('/FacturacionArticulo/:id', FacturacionArticuloController_1.deleteFacturacionArticuloById);
// Consultas por criterios y reporte de rentas
router.get('/ventasPorUsuario/:usuarioID', IsAdmin_1.validateToken, FacturacionArticuloController_1.getVentasPorUsuario);
router.get('/ventasPorFecha', IsAdmin_1.validateToken, FacturacionArticuloController_1.getVentasPorFecha);
router.get('/ventasPorCampus/:campusID', IsAdmin_1.validateToken, FacturacionArticuloController_1.getVentasPorCampus);
router.get('/reporteRentas', IsAdmin_1.validateToken, FacturacionArticuloController_1.generarReporteDeRentas);
exports.default = router;
