const express = require("express");
const router = express.Router();

const {
  createBankAccount,
  updateBankAccount,
  getCurrencies,
  getTypes,
} = require("../controllers/bankAccount");

router.post("/bank/createAccount", createBankAccount);
router.post("/bank/updateAccount", updateBankAccount);
router.get("/bank/currencies", getCurrencies);
router.get("/bank/typeAccounts", getTypes);

module.exports = router;
