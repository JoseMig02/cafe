

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    }
  },
  database: 'Cafeteriaaa',
  username: 'jose',
  password: 'Marti@nene02',
  host: 'servidorcafe.database.windows.net',
  port: 1433,
});

export default sequelize;
