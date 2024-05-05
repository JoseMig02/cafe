// proveedor.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Proveedores = sequelize.define('Proveedores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreComercial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rnc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Proveedores };
