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

module.exports.reportTransactionsTest =  ({
  user_id,
  typeTransaction_id,
  category_id,
  date_end,
  ba_account_id,
}) => {
  let bindings = {
    user_id,
   /* typeTransaction_id,
     category_id,
    date_end,
    ba_account_id,*/
  };
  let SQL_REPORT_TRANSACTIONS = `
  SELECT A.OP_TRANSACTION_ID AS ID,
  A.DESCRIPTION,
  A.AMOUNT,
  TO_CHAR(A.ADD_DATE, 'DD/MM/YYYY') AS DATEADDED
FROM OP_TRANSACTION A
WHERE A.LOGIN_USER_ID=:user_id
  `;

  if (!parseInt(typeTransaction_id) === 0) {
    SQL_REPORT_TRANSACTIONS  +=  ` AND A.OP_TRANSACTION_TYPE_ID = :typeTransaction_id`;
    bindings.typeTransaction_id =  typeTransaction_id;
  }
  if (!category_id == 0) {
    SQL_REPORT_TRANSACTIONS += ` AND A.OP_CATEGORY_ID = :category_id`;
  }
  if (!date_end == 0) {
    SQL_REPORT_TRANSACTIONS += ` AND TO_CHAR(A.ADD_DATE, 'DD/MM/YYYY')<=:date_end`;
  }
  if (!ba_account_id == 0) {
    SQL_REPORT_TRANSACTIONS += ` AND A.BA_ACCOUNT_ID = :ba_account_id`;
  }
  console.log(bindings, SQL_REPORT_TRANSACTIONS);
  return pool(SQL_REPORT_TRANSACTIONS, bindings);
};

module.exports.reportTransactions =  ({
  user_id,
  typeTransaction_id,
  category_id,
  date_end,
  ba_account_id,
}) => {
  let bindings = {
    user_id,
   /* typeTransaction_id,
     category_id,
    date_end,
    ba_account_id,*/
  };
  let SQL_REPORT_TRANSACTIONS = `
  SELECT A.OP_TRANSACTION_ID AS ID,
  A.DESCRIPTION,
  A.AMOUNT,
  TO_CHAR(A.ADD_DATE, 'DD/MM/YYYY') AS DATEADDED
FROM OP_TRANSACTION A
WHERE A.LOGIN_USER_ID=:user_id
  `;
  return pool(SQL_REPORT_TRANSACTIONS, bindings);
};
