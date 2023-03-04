const Customer = require("../models/CustomerModel");

module.exports.create = async (req, res, next) => {
  try {
    let customer = new Customer(
      req.body.customerName.trim(),
      req.body.phoneNumber,
      req.body.email,
      req.body.address
    );

    // check if customer already exist
    const [name] = await Customer.findByName(req.body.customerName);
    if (name.length > 0) {
      return res.send({
        message: "អតិថិជនមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!",
        success: false,
      });
    }

    customer = await customer.save();
    res.send({
      message: "អតិថិជនត្រូវបានបញ្ចូលទៅក្នុងប្រព័ន្ធដោយជោគជជ័យ!",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.searchCustomerName = async (req, res, next) => {
  try {
    let { q } = req.query;
    if (q) {
      const [cus] = await Customer.searchByName(q);
      if (cus.length > 0) {
        res.send({ data: cus, success: true });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findAll = async (req, res, next) => {
  try {
    const cus = await Customer.findAll();
    res.send(cus);
  } catch (err) {
    next(err);
  }
};
