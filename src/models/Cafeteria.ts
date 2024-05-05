// cafeteria.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Campus } from './Campus'; // Importa el modelo de Campus

const Cafeteria = sequelize.define('Cafeteria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  campusID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Campus, // Referencia al modelo de Campus
      key: 'id', // Clave primaria en el modelo de Campus
    },
  },
  encargado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
});

// Establece la relación
Cafeteria.belongsTo(Campus, { foreignKey: 'campusID', as: 'campus' });

export { Cafeteria };
