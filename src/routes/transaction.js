const express = require("express");
const router = express.Router();

const {
  getTypes,
  getCategories,
  createTransaction,
  reportTransactions
} = require("../controllers/transaction");

router.get("/transaction/types", getTypes);
router.get("/transaction/categories", getCategories);
router.post("/transaction/create", createTransaction);
router.post("/transaction/report", reportTransactions);

module.exports = router;
