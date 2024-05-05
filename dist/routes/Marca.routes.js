"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MarcaController_1 = require("../controllers/MarcaController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = (0, express_1.Router)();
// Rutas para marcas
router.get('/marcas', IsAdmin_1.validateToken, MarcaController_1.obtenerMarcas);
router.post('/marcas', IsAdmin_1.validateToken, MarcaController_1.createMarca);
router.get('/marcas/:id', IsAdmin_1.validateToken, MarcaController_1.obtenerMarcaPorId);
router.put('/marcas/:id', IsAdmin_1.validateToken, MarcaController_1.updateMarca);
router.delete('/marcas/:id', IsAdmin_1.validateToken, MarcaController_1.deleteMarca);
exports.default = router;
