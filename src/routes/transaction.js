const express = require("express");
const router = express.Router();

const { getTypes, getCategories } = require("../controllers/transaction");

router.get("/transaction/types", getTypes);
router.get("/transaction/categories", getCategories);

module.exports = router;