// tipoUsuario.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const TipoUsuario = sequelize.define('TipoUsuario', {
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
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { TipoUsuario };
