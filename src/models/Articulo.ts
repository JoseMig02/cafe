// articulo.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Marca } from './Marca'; // Importa el modelo de Marca
import { Proveedores } from './Proovedor'; // Importa el modelo de Proveedor

const Articulo = sequelize.define('Articulo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  nombre: {
    type: DataTypes.STRING,
  
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  marcaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Marca, // Referencia al modelo de Marca
      key: 'id', // Clave primaria en el modelo de Marca
    },
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  proveedorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proveedores, // Referencia al modelo de Proveedor
      key: 'id', // Clave primaria en el modelo de Proveedor
    },
  },
  existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING, // Suponiendo que el campo de la imagen es una URL
  },
});

// Establece las relaciones
Articulo.belongsTo(Marca, { foreignKey: 'marcaID', as: 'marca' });
Articulo.belongsTo(Proveedores, { foreignKey: 'proveedorID', as: 'proveedores' });

export { Articulo };
