"use strict";
// empleado.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmpleadoController_1 = require("../controllers/EmpleadoController");
const Multer_1 = require("../middlewares/Multer");
//import validateToken from '../middlewares/validateToken';
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = (0, express_1.Router)();
// Rutas para CRUD de empleados
router.get('/empleados', IsAdmin_1.validateToken, EmpleadoController_1.obtenerEmpleados);
router.post('/empleados', IsAdmin_1.validateToken, EmpleadoController_1.crearEmpleado);
router.get('/empleados/:id', IsAdmin_1.validateToken, EmpleadoController_1.obtenerEmpleadoPorId);
router.put('/empleados/:id', IsAdmin_1.validateToken, EmpleadoController_1.actualizarEmpleado);
router.delete('/empleados/:id', IsAdmin_1.validateToken, EmpleadoController_1.eliminarEmpleado);
router.get('/empleados/exportar-pdf/pdf', IsAdmin_1.validateToken, EmpleadoController_1.exportarEmpleadosPDF);
router.post('/empleados/:id/imagen', IsAdmin_1.validateToken, Multer_1.multerUpload.single('imagen'), EmpleadoController_1.subirImagenEmpleado);
router.get('/empleados/:id/imagen', IsAdmin_1.validateToken, EmpleadoController_1.obtenerImagenEmpleado);
exports.default = router;
