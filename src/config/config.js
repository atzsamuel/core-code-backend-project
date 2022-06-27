const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  server: {
    port: process.env.SERVER_PORT,
  },
  oracleConfig: {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
    poolMax: 10,
    poolMin: 1,
    poolIncrement: 1,
  },
};
