const { pool } = require("../utils/oracle");

module.exports.getTransactionTypes = () => {
  const SQL_GET_TRANSACTION_TYPES = `
  SELECT OP_TRANSACTION_TYPE_ID AS ID, NAME FROM OP_TRANSACTION_TYPE
  ORDER BY OP_TRANSACTION_TYPE_ID`;
  return pool(SQL_GET_TRANSACTION_TYPES, {}, { autoCommit: true });
};

module.exports.getTransactionCategories = () => {
  const SQL_GET_TRANSACTION_CATEGORIES = `
  SELECT OP_CATEGORY_ID AS ID, NAME FROM OP_CATEGORY
  ORDER BY OP_CATEGORY_ID`;
  return pool(SQL_GET_TRANSACTION_CATEGORIES, {}, { autoCommit: true });
};
