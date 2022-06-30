const express = require("express");
const router = express.Router();

const {
  createBankAccount,
  updateBankAccount,
  getCurrencies,
  getTypeAccounts,
} = require("../controllers/bankAccount");

router.post("/bank/create", createBankAccount);
router.post("/bank/update", updateBankAccount);
router.get("/bank/currencies", getCurrencies);
router.get("/bank/typeAccounts", getTypeAccounts);

module.exports = router;
