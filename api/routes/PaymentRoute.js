const express = require("express");
const Payment = require("../controllers/PaymentControllers");
const router = express.Router();

router.get("/api/payments", Payment.findAll);

module.exports = router;
