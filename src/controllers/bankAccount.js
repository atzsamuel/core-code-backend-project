const bankAccount = require("../models/bankAccount");

module.exports.createBankAccount = async (req, res, next) => {
  const args = {
    name: req.body.name,
    description: req.body.description,
    user_id: req.body.user_id,
    type_id: req.body.type_id,
    currency_id: req.body.currency_id,
    account_number: req.body.account_number,
    account_balance: req.body.account_balance,
    account_status: req.body.account_status,
  };

  try {
    await bankAccount.create(args);
    res.status(200).json({
      message: "Bank account created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Bank account creation failed!",
    });
  }
};

module.exports.updateBankAccount = async (req, res, next) => {
  const args = {
    ba_account_id: req.body.ba_account_id,
    user_id: req.body.user_id,
    account_status: req.body.account_status,
  };

  try {
    await bankAccount.update(args);
    res.status(200).json({
      message: "Bank account updated successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Bank account update failed!",
    });
  }
};

module.exports.getCurrencies = async (req, res, next) => {
  try {
    const { rows } = await bankAccount.getCurrency();
    res.status(200).json({
      message: "Currencies retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Currencies retrieval failed!",
    });
  }
};

module.exports.getTypes = async (req, res, next) => {
  try {
    const { rows } = await bankAccount.getTypeAccount();
    res.status(200).json({
      message: "Types accounts retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Types accounts retrieval failed!",
    });
  }
};

module.exports.getListBank = async (req, res, next) => {
  const args = {
    user_id: req.body.user_id,
  };

  try {
    const { rows } = await bankAccount.getListBank(args);
    res.status(200).json({
      message: "List bank accounts retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "List bank accounts retrieval failed!",
    });
  }
};

module.exports.getListAllAccountBank = async (req, res, next) => {
  const args = {
    user_id: req.body.user_id,
  };

  try {
    const { rows } = await bankAccount.getListAllAccountBank(args);
    res.status(200).json({
      message: "List all bank accounts retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "List all bank accounts retrieval failed!",
    });
  }
};
