// cafeteria.routes.ts

import { Router } from 'express';
import {
  obtenerCafeterias,
  crearCafeteria,
  obtenerCafeteriaPorId,
  actualizarCafeteria,
  eliminarCafeteria,
  subirImagenCafeteria,
  obtenerImagenCafeteria,
} from '../controllers/CafeteriaController';
import {validateToken} from '../middlewares/IsAdmin'
import { multerUpload } from "../middlewares/Multer";


const router = Router();


// Rutas para CRUD de cafeterías
router.get('/cafeterias',validateToken, obtenerCafeterias);
router.post('/cafeterias',validateToken, crearCafeteria);
router.get('/cafeterias/:id',validateToken, obtenerCafeteriaPorId);
router.put('/cafeterias/:id',validateToken, actualizarCafeteria);
router.delete('/cafeterias/:id',validateToken, eliminarCafeteria);

// Rutas para subir y obtener imagen de cafetería
router.post('/cafeterias/:id/imagen',validateToken, multerUpload.single('imagen'), subirImagenCafeteria);
router.get('/cafeterias/:id/imagen',validateToken, obtenerImagenCafeteria);

export default router;
