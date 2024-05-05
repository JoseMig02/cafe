"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//models
const Empleado_1 = require("./Empleado");
const Articulo_1 = require("./Articulo");
const Usuario_1 = require("./Usuario");
const Campus_1 = require("./Campus");
const Cafeteria_1 = require("./Cafeteria");
const TipoUsuario_1 = require("./TipoUsuario");
const FacturacionArticulo_1 = require("./FacturacionArticulo");
const Proovedor_1 = require("./Proovedor");
const Marca_1 = require("./Marca");
//Routes
const TipoUsuario_routes_1 = __importDefault(require("../routes/TipoUsuario.routes"));
const Proveedor_routes_1 = __importDefault(require("../routes/Proveedor.routes"));
const Marca_routes_1 = __importDefault(require("../routes/Marca.routes"));
const Empleado_routes_1 = __importDefault(require("../routes/Empleado.routes"));
const CampusRoutes_1 = __importDefault(require("../routes/CampusRoutes"));
const Cafeteria_routes_1 = __importDefault(require("../routes/Cafeteria.routes"));
const Articulo_routes_1 = __importDefault(require("../routes/Articulo.routes"));
const Usuario_routes_1 = __importDefault(require("../routes/Usuario.routes"));
const FacturacionArticulo_routes_1 = __importDefault(require("../routes/FacturacionArticulo.routes"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3500;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    midlewares() {
        // Parseo body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Configurar cabeceras y cors
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/tipoUsuarios', TipoUsuario_routes_1.default);
        this.app.use('/api/proveedores', Proveedor_routes_1.default);
        this.app.use('/api/marcas', Marca_routes_1.default);
        this.app.use('/api/empleados', Empleado_routes_1.default);
        this.app.use('/api/campus', CampusRoutes_1.default);
        this.app.use('/api/cafeteria', Cafeteria_routes_1.default);
        this.app.use('/api/articulos', Articulo_routes_1.default);
        this.app.use('/api/usuarios', Usuario_routes_1.default);
        this.app.use('/api/FacturacionArticulo', FacturacionArticulo_routes_1.default);
    }
    dbconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield TipoUsuario_1.TipoUsuario.sync();
                yield Usuario_1.Usuario.sync();
                yield Empleado_1.Empleado.sync();
                yield Proovedor_1.Proveedores.sync();
                yield Marca_1.Marca.sync();
                yield Articulo_1.Articulo.sync();
                yield Campus_1.Campus.sync();
                yield Cafeteria_1.Cafeteria.sync();
                yield FacturacionArticulo_1.FacturacionArticulos.sync();
                console.log('Conexión exitosa a la base de datos y sincronización de modelos completa');
            }
            catch (err) {
                console.error('Error al conectar y sincronizar modelos:', err);
            }
        });
    }
}
exports.default = server;
