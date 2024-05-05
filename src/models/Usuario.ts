// usuario.model.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { TipoUsuario } from './TipoUsuario'; // Importa el modelo de TipoUsuario

const Usuario = sequelize.define('Usuario', {
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
  img: {
    type: DataTypes.STRING, // Suponiendo que el campo de la imagen es una URL
  },
  tipoUsuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoUsuario, // Referencia al modelo de TipoUsuario
      key: 'id', // Clave primaria en el modelo de TipoUsuario
    },
  },
  limiteCredito: {
    type: DataTypes.FLOAT,
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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El email debe ser único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Establece la relación
Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipoUsuarioID', as: 'tipoUsuario' });

export { Usuario };
