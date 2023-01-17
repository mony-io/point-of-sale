const db = require("../config/db");

class Product {
  constructor(
    category_id,
    brand_id,
    product_code,
    product_name,
    qty,
    price_instock,
    retail_price,
    wholesale_price,
    exp_date,
    product_image,
    desc,
    status,
    reorder_number
  ) {
    this.category_id = category_id;
    this.brand_id = brand_id;
    this.product_code = product_code;
    this.product_name = product_name;
    this.qty = qty;
    this.price_instock = price_instock;
    this.retail_price = retail_price;
    this.wholesale_price = wholesale_price;
    this.exp_date = exp_date;
    this.product_image = product_image;
    this.desc = desc;
    this.status = status;
    this.reorder_number = reorder_number;
  }

  save() {
    //product_code,product_name,qty,price_instock,retail_price,wholesale_price,product_image,status ,reorder_number
    const sql =
      "INSERT INTO tblProducts(category_id,brand_id,product_code,product_name,qty,price_instock,retail_price,wholesale_price,exp_date,product_image,`desc`,status,reorder_number) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

    return db.execute(sql, [
      this.category_id,
      this.brand_id,
      this.product_code,
      this.product_name,
      this.qty,
      this.price_instock,
      this.retail_price,
      this.wholesale_price,
      this.exp_date,
      this.product_image,
      this.desc,
      this.status,
      this.reorder_number,
    ]);
  }

  static updateProductById(
    category_id,
    brand_id,
    product_code,
    product_name,
    qty,
    price_instock,
    retail_price,
    wholesale_price,
    exp_date,
    product_image,
    desc,
    status,
    reorder_number,
    product_id
  ) {
    const sql =
      "UPDATE tblProducts SET category_id=?,brand_id=?,product_code=?,product_name=?,qty=?,price_instock=?,retail_price=?,wholesale_price=?,exp_date=?,product_image=?,`desc`=?,status=?,reorder_number=? WHERE product_id=?";
    return db.query(sql, [
      category_id,
      brand_id,
      product_code,
      product_name,
      qty,
      price_instock,
      retail_price,
      wholesale_price,
      exp_date,
      product_image,
      desc,
      status,
      reorder_number,
      product_id,
    ]);
  }

  static findImageById(id) {
    const sql = "SELECT product_image FROM tblProducts WHERE product_id=?";
    return db.execute(sql, [id]);
  }

  static findProductByName(product_name) {
    const sql = "SELECT product_name FROM tblProducts WHERE product_name = ?";
    return db.execute(sql, [product_name]);
  }

  static findProductCode(product_code) {
    const sql = "SELECT product_code FROM tblProducts WHERE product_code = ?";
    return db.execute(sql, [product_code]);
  }

  static findAllProduct() {
    const sql = "SELECT *FROM tblProducts";
    return db.execute(sql);
  }

  static findDuplicateByName(id, product_name) {
    const sql =
      "SELECT *FROM tblProducts WHERE NOT product_id=? AND product_name=?";
    return db.execute(sql, [id, product_name]);
  }

  static findDuplicateByProductCode(id, product_code) {
    const sql =
      "SELECT *FROM tblProducts WHERE NOT product_id=? AND product_code=?";
    return db.execute(sql, [id, product_code]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblProducts WHERE product_id = ?";
    return db.execute(sql, [id]);
  }

  static deleteImageById(id) {
    const sql = "UPDATE tblProducts SET product_image='' WHERE product_id=?";
    return db.execute(sql, [id]);
  }

  static findProductById(id) {
    const sql = "SELECT *FROM tblProducts WHERE product_id=?";
    return db.execute(sql, [id]);
  }
}

module.exports = Product;
