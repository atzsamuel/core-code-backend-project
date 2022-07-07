const { pool } = require("../utils/oracle");

module.exports.create = ({
  name,
  description,
  user_id,
  type_id,
  currency_id,
  account_number,
  account_balance,
  account_status,
}) => {
  const bindings = {
    name,
    description,
    user_id,
    type_id,
    currency_id,
    account_number,
    account_balance,
    account_status,
  };
  const SQL_CREATE_BANK_ACCOUNT = `
  INSERT INTO BA_ACCOUNT(BA_ACCOUNT_ID,NAME,DESCRIPTION,LOGIN_USER_ID,BA_TYPE_ID,BA_CURRENCY_ID,ACCOUNT_NUMBER,ACCOUNT_BALANCE,ACCOUNT_STATUS)
  VALUES(SQ_BA_ACCOUNT.NEXTVAL,:name,:description,:user_id,:type_id,:currency_id,:account_number,:account_balance,:account_status)`;
  console.log(bindings, SQL_CREATE_BANK_ACCOUNT);
  return pool(SQL_CREATE_BANK_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.update = ({ ba_account_id, user_id, account_status }) => {
  const bindings = {
    ba_account_id,
    user_id,
    account_status,
  };
  const SQL_UPDATE_BANK_ACCOUNT = `
  UPDATE BA_ACCOUNT
  SET
  ACCOUNT_STATUS = :account_status,
  MOD_DATE = SYSDATE
  WHERE BA_ACCOUNT_ID = :ba_account_id AND LOGIN_USER_ID = :user_id`;
  console.log(bindings, SQL_UPDATE_BANK_ACCOUNT);
  return pool(SQL_UPDATE_BANK_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.getCurrency = () => {
  const SQL_GET_CURRENCY = `
  SELECT BA_CURRENCY_ID AS ID,NAME FROM BA_CURRENCY ORDER BY BA_CURRENCY_ID`;
  return pool(SQL_GET_CURRENCY, {}, { autoCommit: true });
};

module.exports.getTypeAccount = () => {
  const SQL_GET_TYPE_ACCOUNT = `
  SELECT BA_TYPE_ID AS ID, NAME FROM BA_TYPE ORDER BY BA_TYPE_ID`;
  return pool(SQL_GET_TYPE_ACCOUNT, {}, { autoCommit: true });
};

module.exports.getListBank = ({ user_id }) => {
  const bindings = {
    user_id,
  };
  const SQL_GET_LIST_BANK = `
  SELECT BA_ACCOUNT_ID AS ID, NAME FROM BA_ACCOUNT WHERE LOGIN_USER_ID = :user_id ORDER BY BA_ACCOUNT_ID`;
  return pool(SQL_GET_LIST_BANK, bindings, { autoCommit: true });
};

module.exports.getListAllAccountBank = ({ user_id }) => {
  const bindings = {
    user_id,
  };
  const SQL_GET_LIST_ALL_BANK = `
  SELECT A.BA_ACCOUNT_ID AS ID,
  A.NAME,
  A.DESCRIPTION,
  B.NAME AS CURRENCY,
  A.ACCOUNT_BALANCE,
  A.ACCOUNT_STATUS,
  CASE WHEN A.ACCOUNT_STATUS=1 THEN 'Active' WHEN A.ACCOUNT_STATUS=2 THEN 'Inactive' END AS STATUS
FROM BA_ACCOUNT A, BA_CURRENCY B
WHERE A.LOGIN_USER_ID = :user_id
AND A.BA_CURRENCY_ID=B.BA_CURRENCY_ID
ORDER BY A.BA_ACCOUNT_ID
  `;
  return pool(SQL_GET_LIST_ALL_BANK, bindings, { autoCommit: true });
};
