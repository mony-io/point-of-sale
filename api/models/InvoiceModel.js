const db = require("../config/db");

class Invoice {
  constructor(payment_id, amount, reamin) {
    this.payment_id = payment_id;
    this.amount = amount;
    this.reamin = reamin;
  }

  save() {
    const sql =
      "INSERT INTO tblInvoice(payment_id,amount,money_change) VALUES(?,?,?)";
    return db.execute(sql, [this.payment_id, this.amount, this.reamin]);
  }

  static saleInvoice(id) {
    const sql = "CALL SaleInvoice_sp(?)";
    return db.execute(sql, [id]);
  }
}

module.exports = Invoice;
