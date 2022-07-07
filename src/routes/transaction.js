const express = require("express");
const router = express.Router();

const {
  getTypes,
  getCategories,
  createTransaction,
  reportTransactions,
  transferAmount,
  reportTransfers,
  dashboard,
} = require("../controllers/transaction");

router.get("/transaction/types", getTypes);
router.get("/transaction/categories", getCategories);
router.post("/transaction/create", createTransaction);
router.post("/transaction/report", reportTransactions);
router.post("/transaction/transferAmount", transferAmount);
router.post("/transaction/reportTransfer", reportTransfers);
router.post("/transaction/dashboard", dashboard);

module.exports = router;
