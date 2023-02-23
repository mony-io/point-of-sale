const db = require("../config/db");

class Payments {
  static findAllPaymentType() {
    const sql = "SELECT *FROM tblPayments";
    return db.execute(sql);
  }
}

module.exports = Payments;
