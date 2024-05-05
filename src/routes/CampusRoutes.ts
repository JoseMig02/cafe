import { Router } from 'express';
import { obtenerCampus, obtenerCampusPorId, crearCampus, actualizarCampus, eliminarCampus } from '../controllers/CampusController';
import {validateToken} from '../middlewares/IsAdmin'

const router = Router();

// Rutas para CRUD de campus
router.get('/campus',validateToken, obtenerCampus);
router.get('/campus/:id',validateToken, obtenerCampusPorId);
router.post('/campus',validateToken, crearCampus);
router.put('/campus/:id',validateToken, actualizarCampus);
router.delete('/campus/:id',validateToken, eliminarCampus);

export default router;
