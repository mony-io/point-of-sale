const Invoice = require("../models/InvoiceModel");

module.exports.create = async (req, res, next) => {
  try {
    let invoice = new Invoice(
      req.body.payment_id,
      req.body.amount,
      req.body.remain
    );

    [invoice] = await invoice.save();
    res.send({ id: invoice.insertId });
  } catch (err) {
    next(err);
  }
};

module.exports.saleInvoice = async (req, res, next) => {
  try {
    const [invoice] = await Invoice.saleInvoice(req.params.id);
    res.send(invoice);
  } catch (err) {
    next(err);
  }
};
