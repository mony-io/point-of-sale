const express = require("express");

const router = express.Router();
const SaleDetail = require("../controllers/SaleDetailController");

router.post("/api/sale_detail", SaleDetail.create);

module.exports = router;
