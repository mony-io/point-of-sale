const db = require("../config/db");

class SaleDetail {
  constructor(products) {
    this.products = products;
    console.log(this.products);
  }
  save() {
    const sql =
      "INSERT INTO tblSaleDetails(sale_id,product_id,qty_sales) VALUES ?";
    return db.query(sql, [
      this.products.map((item) => [item.sale_id, item.product_id, item.qty]),
    ]);
  }
}

module.exports = SaleDetail;
