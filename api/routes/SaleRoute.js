const express = require("express");

const router = express.Router();
const Sale = require("../controllers/SaleController");

router.post("/api/sale", Sale.create);

module.exports = router;
