// empleado.model.ts
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Empleado = sequelize.define('Empleado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tandaLabor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porcientoComision: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaIngreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING
   
  },
});

export { Empleado };
