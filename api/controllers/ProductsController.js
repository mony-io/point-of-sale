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
}
