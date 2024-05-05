// empleado.routes.ts

import { Router } from 'express';
import { obtenerEmpleados, crearEmpleado, obtenerEmpleadoPorId, actualizarEmpleado, eliminarEmpleado,exportarEmpleadosPDF,subirImagenEmpleado,obtenerImagenEmpleado } from '../controllers/EmpleadoController';
import { multerUpload } from '../middlewares/Multer';

//import validateToken from '../middlewares/validateToken';
import {validateToken} from '../middlewares/IsAdmin'





const router = Router();

// Rutas para CRUD de empleados
router.get('/empleados',validateToken, obtenerEmpleados);
router.post('/empleados',validateToken, crearEmpleado);
router.get('/empleados/:id',validateToken, obtenerEmpleadoPorId);
router.put('/empleados/:id',validateToken, actualizarEmpleado);
router.delete('/empleados/:id',validateToken, eliminarEmpleado);
router.get('/empleados/exportar-pdf/pdf',validateToken, exportarEmpleadosPDF);
router.post('/empleados/:id/imagen',validateToken, multerUpload.single('imagen'), subirImagenEmpleado);
router.get('/empleados/:id/imagen', validateToken, obtenerImagenEmpleado);

export default router;
