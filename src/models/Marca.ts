// marca.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Marca = sequelize.define('Marca', {
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
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Marca };
