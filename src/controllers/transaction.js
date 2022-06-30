const transactions = require("../models/transaction");

module.exports.getTypes = async (req, res, next) => {
  try {
    const { rows } = await transactions.getTransactionTypes();
    console.log('Data rows getTypes',rows);
    res.status(200).json({
      message: "Transaction types retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transaction types retrieval failed!",
    });
  }
};

module.exports.getCategories = async (req, res, next) => {
  try {
    const { rows } = await transactions.getTransactionCategories();
    res.status(200).json({
      message: "Transaction categories retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transaction categories retrieval failed!",
    });
  }
};
