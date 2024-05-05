"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TipoUsuarioController_1 = require("../controllers/TipoUsuarioController");
const IsAdmin_1 = require("../middlewares/IsAdmin");
const router = express_1.default.Router();
router.get('/tipoUsuarios', IsAdmin_1.validateToken, TipoUsuarioController_1.getAllTipoUsuarios);
router.post('/tipoUsuarios', IsAdmin_1.validateToken, TipoUsuarioController_1.createTipoUsuario);
router.get('/tipoUsuarios/:id', IsAdmin_1.validateToken, TipoUsuarioController_1.getTipoUsuarioById);
router.put('/tipoUsuarios/:id', IsAdmin_1.validateToken, TipoUsuarioController_1.updateTipoUsuario);
router.delete('/tipoUsuarios/:id', IsAdmin_1.validateToken, TipoUsuarioController_1.deleteTipoUsuario);
exports.default = router;
