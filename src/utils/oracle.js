const oracledb = require("oracledb");
const { oracleConfig } = require("../config/config");
const path = require("path");

//Path to client
const oracleClient = path.join(
  "C:",
  "oracle",
  "WINDOWS.X64_193000_db_home",
  "bin"
);

// Init client
oracledb.initOracleClient({
  libDir: oracleClient,
});

// Init database
module.exports.start = async () => {
  await oracledb.createPool(oracleConfig);
};

// Close database
module.exports.close = async () => {
  await oracledb.closePool(0);
};

// Request handler (pool handler)
module.exports.pool = async (statement, binds = [], opts = {}) => {
  let conn;
  let result = [];
  opts.outFormat = oracledb.OBJECT;
  try {
    conn = await oraclepdb.getConnection();
    result = await conn.execute(statement, binds, opts);
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
