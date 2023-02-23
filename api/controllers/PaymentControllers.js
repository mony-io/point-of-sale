const Payment = require("../models/PaymentModel");
module.exports.findAll = async (req, res, next) => {
  try {
    const [paymentType] = await Payment.findAllPaymentType();
    res.send(paymentType);
  } catch (err) {
    next(err);
  }
};
