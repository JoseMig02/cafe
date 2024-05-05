"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CampusController_1 = require("../controllers/CampusController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = (0, express_1.Router)();
// Rutas para CRUD de campus
router.get('/campus', IsAdmin_1.validateToken, CampusController_1.obtenerCampus);
router.get('/campus/:id', IsAdmin_1.validateToken, CampusController_1.obtenerCampusPorId);
router.post('/campus', IsAdmin_1.validateToken, CampusController_1.crearCampus);
router.put('/campus/:id', IsAdmin_1.validateToken, CampusController_1.actualizarCampus);
router.delete('/campus/:id', IsAdmin_1.validateToken, CampusController_1.eliminarCampus);
exports.default = router;
