// facturacionArticulos.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Empleado } from './Empleado';
import { Articulo } from './Articulo'; 
import { Usuario } from './Usuario'; 
import { Campus } from './Campus'; 
import { Cafeteria } from './Cafeteria'; 

const FacturacionArticulos = sequelize.define('FacturacionArticulos', {
  noFactura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empleadoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empleado, // Referencia al modelo de Empleado
      key: 'id', // Clave primaria en el modelo de Empleado
    },
  },
  articuloID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Articulo, // Referencia al modelo de Articulo
      key: 'id', // Clave primaria en el modelo de Articulo
    },
  },
  usuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referencia al modelo de Usuario
      key: 'id', // Clave primaria en el modelo de Usuario
    },
  },
  campusID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Campus, // Referencia al modelo de Campus
      key: 'id', // Clave primaria en el modelo de Campus
    },
  },
  cafeteriaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cafeteria, // Referencia al modelo de Cafeteria
      key: 'id', // Clave primaria en el modelo de Cafeteria
    },
  },
  fechaVenta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  montoArticulo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Total: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  unidadesVendidas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

FacturacionArticulos.belongsTo(Empleado, { foreignKey: 'empleadoID', as: 'empleado' });
FacturacionArticulos.belongsTo(Articulo, { foreignKey: 'articuloID', as: 'articulo' });
FacturacionArticulos.belongsTo(Usuario, { foreignKey: 'usuarioID', as: 'usuario' });
FacturacionArticulos.belongsTo(Campus, { foreignKey: 'campusID', as: 'campus' });
FacturacionArticulos.belongsTo(Cafeteria, { foreignKey: 'cafeteriaID', as: 'cafeteria' });

export { FacturacionArticulos };

