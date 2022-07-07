const express = require("express");
const router = express.Router();

const {
  createBankAccount,
  updateBankAccount,
  getCurrencies,
  getTypes,
  getListBank,
  getListAllAccountBank
} = require("../controllers/bankAccount");

router.post("/bank/createAccount", createBankAccount);
router.post("/bank/updateAccount", updateBankAccount);
router.get("/bank/currencies", getCurrencies);
router.get("/bank/typeAccounts", getTypes);
router.post("/bank/listBank", getListBank);
router.post("/bank/listAllAccountBank", getListAllAccountBank);

module.exports = router;
