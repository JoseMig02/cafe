import { Router } from 'express';
import {
    getAllFacturacionArticulos,
    getFacturacionArticuloById,
    createFacturacionArticulo,
    updateFacturacionArticuloById,
    deleteFacturacionArticuloById,
    getVentasPorUsuario,
    getVentasPorFecha,
    getVentasPorCampus,
    generarReporteDeRentas
} from '../controllers/FacturacionArticuloController';
import {validateToken} from '../middlewares/IsAdmin'

const router = Router();

// Rutas CRUD para FacturacionArticulos
router.get('/FacturacionArticulo',validateToken, getAllFacturacionArticulos);
router.get('/FacturacionArticulo/:id',validateToken, getFacturacionArticuloById);
router.post('/FacturacionArticulo', validateToken,createFacturacionArticulo);
router.put('/FacturacionArticulo/:id',validateToken, updateFacturacionArticuloById);
router.delete('/FacturacionArticulo/:id', deleteFacturacionArticuloById);

// Consultas por criterios y reporte de rentas
router.get('/ventasPorUsuario/:usuarioID',validateToken, getVentasPorUsuario);
router.get('/ventasPorFecha',validateToken, getVentasPorFecha);
router.get('/ventasPorCampus/:campusID',validateToken, getVentasPorCampus);
router.get('/reporteRentas',validateToken, generarReporteDeRentas);

export default router;
