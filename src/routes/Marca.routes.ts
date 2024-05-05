import { Router } from 'express';
import {  obtenerMarcas, 
    obtenerMarcaPorId,
    createMarca,
    updateMarca,
    deleteMarca } from '../controllers/MarcaController';
    import {validateToken, isAdmin} from '../middlewares/IsAdmin'

const router = Router();

// Rutas para marcas
router.get('/marcas',validateToken, obtenerMarcas);
router.post('/marcas',validateToken, createMarca);
router.get('/marcas/:id',validateToken, obtenerMarcaPorId);
router.put('/marcas/:id',validateToken, updateMarca);
router.delete('/marcas/:id',validateToken, deleteMarca);

export default router;
