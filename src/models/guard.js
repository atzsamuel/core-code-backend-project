const { pool } = require("../utils/oracle");

module.exports.verifyUserToken = ({ user_token }) => {
  const bindings = {
    user_token,
  };
  const SQL_VERIFY_USER_TOKEN = `
  SELECT
    LOGIN_USER_ID AS USER_ID,
    EMAIL,
    FIRST_NAME,
    LAST_NAME
       FROM LOGIN_USER
WHERE USER_TOKEN=:user_token`;
  return pool(SQL_VERIFY_USER_TOKEN, bindings, { autoCommit: true });
};
