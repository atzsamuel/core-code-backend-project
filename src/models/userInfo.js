const { pool } = require("../utils/oracle");

module.exports.userInfo = ({ user_token }) => {
  const bindings = {
    user_token,
  };
  const SQL_GET_TRANSACTION_CATEGORIES = `
  SELECT
    LOGIN_USER_ID AS USER_ID,
    EMAIL,
    FIRST_NAME,
    LAST_NAME
       FROM LOGIN_USER
WHERE USER_TOKEN=:user_token`;
  return pool(SQL_GET_TRANSACTION_CATEGORIES, bindings, { autoCommit: true });
};
