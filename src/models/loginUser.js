const { pool } = require("../utils/oracle");
const oracledb = require("oracledb");

module.exports.register = ({ email, password, firstname, lastname }) => {
  const bindings = {
    email,
    password,
    firstname,
    lastname,
    user_token: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
  };

  const SQL_REGISTER_USER = `
  INSERT INTO LOGIN_USER(LOGIN_USER_ID,EMAIL,PASSWORD,FIRST_NAME,LAST_NAME,USER_TOKEN)
  VALUES(SQ_LOGIN_USER.NEXTVAL,:email,:password,:firstName,:lastName,API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password))
  RETURNING USER_TOKEN INTO :user_token`;
  console.log(bindings, SQL_REGISTER_USER);
  return pool(SQL_REGISTER_USER, bindings, { autoCommit: true });
};

module.exports.hashpassword = ({ email }) => {
  const bindings = {
    email,
  };
  const SQL_HASH_PASSWORD = `
  SELECT PASSWORD FROM LOGIN_USER WHERE EMAIL = :email`;
  return pool(SQL_HASH_PASSWORD, bindings, { autoCommit: true });
};

module.exports.login = ({ email, password }) => {
  const bindings = {
    email,
    password,
    user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    user_token: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    firstname: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    lastname: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
  };
  const SQL_LOGIN_USER = `
  UPDATE LOGIN_USER
  SET
  USER_TOKEN = API_TOKEN(TO_CHAR(SYSDATE, 'DD-MM-YYYY HH24:MI:SS') || :password),
  MOD_DATE = SYSDATE
  WHERE EMAIL = :email
  RETURNING LOGIN_USER_ID,USER_TOKEN, FIRST_NAME, LAST_NAME INTO :user_id,:user_token,:firstname,:lastname`;
  console.log(bindings, SQL_LOGIN_USER);
  return pool(SQL_LOGIN_USER, bindings, { autoCommit: true });
};
