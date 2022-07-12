const oracledb = require("oracledb");
const { oracleConfig } = require("../config/config");
const path = require("path");

// This is not needed if you use the default location for the database, but if you use a different location, you will need to use this function to get the correct path. 
//Path to client
/*const oracleClient = path.join(
  "C:",
  "oracle",
  "WINDOWS.X64_193000_db_home",
  "bin"
);*/

// Init client
/*oracledb.initOracleClient({
  libDir: oracleClient,
});*/

// Init database
module.exports.start = async () => {
  await oracledb.createPool(oracleConfig);
};

// Close database
module.exports.close = async () => {
  await oracledb.getPool().close(0);
};

// Request handler (pool handler)
module.exports.pool = async (statement, binds = [], opts = {}) => {
  let conn;
  let result = [];
  opts.outFormat = oracledb.OBJECT;
  try {
    conn = await oracledb.getConnection();
    result = await conn.execute(statement, binds, opts);
    console.log("data QUERY result==>", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
