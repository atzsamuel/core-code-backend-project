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

module.exports.getBalance = ({ user_id, account_id }) => {
  const bindings = {
    user_id,
    account_id,
  };
  const SQL_GET_BALANCE = `
  SELECT ACCOUNT_BALANCE FROM BA_ACCOUNT
WHERE LOGIN_USER_ID=:user_id AND BA_ACCOUNT_ID=:account_id`;
  return pool(SQL_GET_BALANCE, bindings, { autoCommit: true });
};

module.exports.createTransaction = ({
  description,
  amount,
  user_id,
  typeTransaction_id,
  category_id,
  account_id,
}) => {
  const bindings = {
    description,
    amount,
    user_id,
    typeTransaction_id,
    category_id,
    account_id,
  };
  const SQL_CREATE_TRANSACTION = `
  INSERT INTO OP_TRANSACTION(OP_TRANSACTION_ID,DESCRIPTION,AMOUNT,LOGIN_USER_ID,OP_TRANSACTION_TYPE_ID,OP_CATEGORY_ID,BA_ACCOUNT_ID)
  VALUES(SQ_OP_TRANSACTION.NEXTVAL,:description,:amount,:user_id,:typeTransaction_id,:category_id,:account_id)`;
  return pool(SQL_CREATE_TRANSACTION, bindings, { autoCommit: true });
};

module.exports.updateBalance = ({ user_id, account_id, new_balance }) => {
  const bindings = {
    user_id,
    account_id,
    new_balance,
  };
  const SQL_UPDATE_BALANCE = `
  UPDATE BA_ACCOUNT
  SET ACCOUNT_BALANCE = TRUNC(:new_balance,2),
  MOD_DATE = SYSDATE
  WHERE LOGIN_USER_ID = :user_id AND BA_ACCOUNT_ID = :account_id`;
  return pool(SQL_UPDATE_BALANCE, bindings, { autoCommit: true });
};
