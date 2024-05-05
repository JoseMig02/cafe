import express from 'express';
import {
  getAllTipoUsuarios,
  createTipoUsuario,
  getTipoUsuarioById,
  deleteTipoUsuario,
  updateTipoUsuario 
} from '../controllers/TipoUsuarioController';
import {validateToken, isAdmin} from '../middlewares/IsAdmin'

const router = express.Router();

router.get('/tipoUsuarios',validateToken, getAllTipoUsuarios);
router.post('/tipoUsuarios',validateToken, createTipoUsuario);
router.get('/tipoUsuarios/:id',validateToken, getTipoUsuarioById);
router.put('/tipoUsuarios/:id',validateToken, updateTipoUsuario);
router.delete('/tipoUsuarios/:id', validateToken, deleteTipoUsuario);

export default router;
