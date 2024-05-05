// campus.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Campus = sequelize.define('Campus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
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

export { Campus };
