const express = require("express");
const Customer = require("../controllers/CustomerController");
const router = express.Router();

router.post("/api/customer", Customer.create);
router.get("/api/cusquery", Customer.searchCustomerName);
router.get("/api/customers", Customer.findAll);

module.exports = router;
