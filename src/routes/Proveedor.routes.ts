// proveedor.routes.ts

import express from 'express';
import {
  getAllProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getTipoUsuarioById 
} from '../controllers/ProveedoreController';
import {validateToken, isAdmin} from '../middlewares/IsAdmin'

const router = express.Router();

// Rutas para los proveedores
router.get('/proveedores',validateToken, getAllProveedores);
router.post('/proveedores',validateToken, createProveedor);
router.get('/proveedores/:id',validateToken, getTipoUsuarioById );
router.put('/proveedores/:id',validateToken, updateProveedor);
router.delete('/proveedores/:id',validateToken, deleteProveedor);
  
export default router;
