import { Router } from "express";
import { loginUser, NewUser , getAllUsers, getUserById, updateUserById, deleteUserById,subirImagenUsuario,obtenerImagenusuario } from "../controllers/UsuarioController";
import {validateToken, isAdmin} from '../middlewares/IsAdmin'
import { multerUpload } from "../middlewares/Multer";

const router = Router();

router.post('/registro', NewUser)
router.post('/login', loginUser)
router.get('/usuarios',validateToken,isAdmin, getAllUsers);
router.get('/usuarios/:id',validateToken,isAdmin, getUserById);
router.put('/usuarios/:id',validateToken,isAdmin, updateUserById);
router.delete('/usuarios/:id',validateToken,isAdmin, deleteUserById);
router.post('/usuarios/:id/imagen', multerUpload.single('imagen'), subirImagenUsuario);
router.get('/usuarios/:id/imagen', obtenerImagenusuario);



export default router;