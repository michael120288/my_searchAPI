const sql = require("mssql");

const sqlConfig = {
  user: `${process.env.SQL_USER}`,
  password: `${process.env.SQL_USER_PASSWORD}`,
  server: `${process.env.SQL_SERVER}`,
  database: `${process.env.SQL_DATABASE}`,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    connectTimeout: 30000,
    port: 1433,
  },
};

module.exports = sql.connect(sqlConfig);
