const express = require("express");
const router = express.Router();
const Invoice = require("../controllers/InvoiceController");

router.post("/api/invoice", Invoice.create);
router.get("/api/saleInvoice/:id", Invoice.saleInvoice);

module.exports = router;
