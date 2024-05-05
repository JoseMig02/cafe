import express, {Application} from "express"
import cors from 'cors'

//models
import { Empleado } from './Empleado';
import { Articulo } from './Articulo'; 
import { Usuario } from './Usuario'; 
import { Campus } from './Campus'; 
import { Cafeteria } from './Cafeteria'; 
import { TipoUsuario } from './TipoUsuario'; 
import { FacturacionArticulos } from './FacturacionArticulo'; 
import { Proveedores } from './Proovedor'; 
import { Marca } from './Marca'; 

//Routes
import tipoUsuarioRoutes from '../routes/TipoUsuario.routes';
import proveedorRoutes from '../routes/Proveedor.routes';
import MarcaRoutes from '../routes/Marca.routes'
import EmpleadoRoutes from '../routes/Empleado.routes'
import CampusRoutes from '../routes/CampusRoutes'
import CafeteriaRoutes  from "../routes/Cafeteria.routes";
import ArticulosRoutes from '../routes/Articulo.routes'
import UsuarioRoutes from '../routes/Usuario.routes'
import FacturacionArticulo from '../routes/FacturacionArticulo.routes'





class server {

    private app:Application;
    private port: number;

    constructor(){
        this.app= express();
        this.port=3500;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();

    }

listen(){
        this.app.listen(this.port, ()=>{
            console.log('Aplicacion corriendo en el puerto '+this.port)

        })
    }
 midlewares() {
        // Parseo body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Configurar cabeceras y cors
    this.app.use(cors());
          
    }
routes(){

     this.app.use('/api/tipoUsuarios', tipoUsuarioRoutes);
     this.app.use('/api/proveedores', proveedorRoutes);
     this.app.use('/api/marcas',MarcaRoutes);
     this.app.use('/api/empleados',EmpleadoRoutes);
     this.app.use('/api/campus',CampusRoutes);
     this.app.use('/api/cafeteria',CafeteriaRoutes);
     this.app.use('/api/articulos',ArticulosRoutes);
     this.app.use('/api/usuarios',UsuarioRoutes);
     this.app.use('/api/FacturacionArticulo',FacturacionArticulo);


}


async dbconnect() {
    try {
        await TipoUsuario.sync();
       
        await Usuario.sync();
       await Empleado.sync();
       await Proveedores.sync();
       await Marca.sync();
        
        await Articulo.sync();
        await Campus.sync();
        await Cafeteria.sync();
        
        
      
        await FacturacionArticulos.sync();
       

       

        console.log('Conexión exitosa a la base de datos y sincronización de modelos completa');
    } catch (err) {
        console.error('Error al conectar y sincronizar modelos:', err);
    }
}
}

export default server
