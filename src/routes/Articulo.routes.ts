import { Router } from 'express';
import { obtenerArticulos, crearArticulo, obtenerArticuloPorId, actualizarArticulo, eliminarArticulo, subirImagenArticulo ,obtenerImagenArticulo} from '../controllers/ArticulosController'
import { multerUpload } from '../middlewares/Multer';
import {validateToken} from '../middlewares/IsAdmin'

const router = Router();

// Rutas para CRUD de artículos
router.get('/articulos',validateToken, obtenerArticulos);
router.post('/articulos',validateToken, crearArticulo);
router.get('/articulos/:id',validateToken, obtenerArticuloPorId);
router.put('/articulos/:id',validateToken, actualizarArticulo);
router.delete('/articulos/:id',validateToken, eliminarArticulo);
router.post('/articulos/:id/imagen',validateToken, multerUpload.single('imagen'), subirImagenArticulo);
router.get('/articulos/:id/imagen',validateToken, obtenerImagenArticulo );

export default router;
