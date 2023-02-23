const SaleDetail = require("../models/SaleDetailModel");
module.exports.create = async (req, res, next) => {
  try {
    let sale_details = new SaleDetail(req.body);
    sale_details = await sale_details.save();
    res.send({ message: "Noted", success: true });
  } catch (err) {
    next(err);
  }
};
