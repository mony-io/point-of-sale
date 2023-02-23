const Sale = require("../models/SaleModel");
module.exports.create = async (req, res, next) => {
  try {
    let sale = new Sale(
      req.body.user_id,
      req.body.customer_id,
      req.body.invoice_id
    );
    [sale] = await sale.save();
    res.send({ id: sale.insertId, success: true });
  } catch (err) {
    next(err);
  }
};
