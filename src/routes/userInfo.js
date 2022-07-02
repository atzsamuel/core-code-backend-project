const express = require("express");
const router = express.Router();

const { userInfo } = require("../controllers/userInfo");

router.get("/userInfo", userInfo);

module.exports = router;
