const { pool } = require("../utils/oracle");

module.exports.verifyUserToken = (token) => {
  const bindings = {
    token,
  };
  const SQL_VERIFY_USER_TOKEN = `
  SELECT COUNT(*) FROM LOGIN_USER WHERE USER_TOKEN = :token`;
  return pool(SQL_VERIFY_USER_TOKEN, bindings, { autoCommit: true });
};
