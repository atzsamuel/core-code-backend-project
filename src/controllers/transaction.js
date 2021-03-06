const transactions = require("../models/transaction");

module.exports.getTypes = async (req, res, next) => {
  try {
    const { rows } = await transactions.getTransactionTypes();
    // console.log("Data rows getTypes", rows);
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

module.exports.createTransaction = async (req, res, next) => {
  try {
    const argsBalance = {
      user_id: req.body.user_id,
      account_id: req.body.account_id,
    };
    const { rows } = await transactions.getBalance(argsBalance);
    const getBalance = parseFloat(rows[0].ACCOUNT_BALANCE);
    console.log("getBalance", getBalance);

    const argsTransaction = {
      description: req.body.description,
      amount: parseFloat(req.body.amount).toFixed(2),
      user_id: req.body.user_id,
      typeTransaction_id: req.body.typeTransaction_id,
      category_id: req.body.category_id,
      account_id: req.body.account_id,
    };

    const argsUpdateBalance = {
      user_id: req.body.user_id,
      account_id: req.body.account_id,
      new_balance:
        req.body.typeTransaction_id == 1
          ? parseFloat(getBalance) + parseFloat(req.body.amount)
          : parseFloat(getBalance) - parseFloat(req.body.amount),
    };

    //Transaction type with id 1 is income and id 2 is expense
    if (req.body.typeTransaction_id == 1) {
      await transactions.createTransaction(argsTransaction);
      await transactions.updateBalance(argsUpdateBalance);
      res.status(200).json({
        message: "Transaction income created successfully!",
      });
    } else if (req.body.typeTransaction_id == 2) {
      /*console.log(
        "OperationTransaction",
        getBalance,
        parseFloat(req.body.amount),
        getBalance < parseFloat(req.body.amount),
        parseFloat(getBalance) + parseFloat(req.body.amount)
      );*/
      if (getBalance < parseFloat(req.body.amount)) {
        res.status(400).json({
          message: "Insufficient funds",
        });
      } else {
        await transactions.createTransaction(argsTransaction);
        await transactions.updateBalance(argsUpdateBalance);
        res.status(200).json({
          message: "Transaction expense created successfully!",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transaction creation failed!",
    });
  }
};

module.exports.reportTransactions = async (req, res, next) => {
  try {
    const args = {
      user_id: req.body.user_id,
      typeTransaction_id: req.body.typeTransaction_id,
      category_id: req.body.category_id,
      date_end: req.body.date_end,
      ba_account_id: req.body.ba_account_id,
    };
    const { rows } = await transactions.reportTransactions(args);
    res.status(200).json({
      message: "Transactions report retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transactions report retrieval failed!",
    });
  }
};

module.exports.transferAmount = async (req, res, next) => {
  try {
    const argsBalance = {
      user_id: req.body.user_id,
      account_id: req.body.account_id,
    };
    const { rows } = await transactions.getBalance(argsBalance);
    const getBalance = parseFloat(rows[0].ACCOUNT_BALANCE);

    if (getBalance < parseFloat(req.body.amount)) {
      res.status(400).json({
        message: "Insufficient funds",
      });
    } else {
      // insert details of the transfer
      const argsTransfer = {
        description: req.body.description,
        amount: parseFloat(req.body.amount),
        account_id_destination: req.body.account_id_destination,
        account_id: req.body.account_id,
        user_id: req.body.user_id,
      };
      await transactions.insertTransfer(argsTransfer);
      // update balance account origin
      const argsNewBalanceOrigin = {
        user_id: req.body.user_id,
        account_id: req.body.account_id,
        new_balance: parseFloat(getBalance) - parseFloat(req.body.amount),
      };
      await transactions.updateBalance(argsNewBalanceOrigin);
      // update balance destination
      const argsBalance = {
        user_id: req.body.user_id,
        account_id: req.body.account_id_destination,
      };
      const { rows } = await transactions.getBalance(argsBalance);
      const getBalanceDestination = parseFloat(rows[0].ACCOUNT_BALANCE);
      const argsNewBalanceDestination = {
        user_id: req.body.user_id,
        account_id: req.body.account_id_destination,
        new_balance:
          parseFloat(getBalanceDestination) + parseFloat(req.body.amount),
      };
      await transactions.updateBalance(argsNewBalanceDestination);
      res.status(200).json({
        message: "Transfer transaction created successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transfer transaction failed!",
    });
  }
};

module.exports.reportTransfers = async (req, res, next) => {
  try {
    const args = {
      user_id: req.body.user_id,
    };
    const { rows } = await transactions.reportTransfers(args);
    res.status(200).json({
      message: "Transfers report retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Transfers report retrieval failed!",
    });
  }
};

module.exports.dashboard = async (req, res, next) => {
  try {
    const args = {
      user_id: req.body.user_id,
    };
    const { rows } = await transactions.dashboard(args);
    res.status(200).json({
      message: "Dashboard retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Dashboard retrieval failed!",
    });
  }
};
