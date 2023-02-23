const db = require("../config/db");

class Sale {
  constructor(user_id, customer_id, invoice_id) {
    (this.user_id = user_id),
      (this.customer_id = customer_id),
      (this.invoice_id = invoice_id);
  }
  save() {
    const sql =
      "INSERT INTO tblSales(user_id,customer_id,invoice_id,sale_date) VALUES(?,?,?,CURRENT_DATE())";
    return db.execute(sql, [this.user_id, this.customer_id, this.invoice_id]);
  }
}

module.exports = Sale;
