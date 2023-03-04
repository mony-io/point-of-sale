const db = require("../config/db");

class Customer {
  constructor(customerName, phoneNumber, email, address) {
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }

  save() {
    const sql =
      "INSERT INTO tblCustomers(customerName,phoneNumber,email,`address`) VALUES(?,?,?,?)";
    return db.execute(sql, [
      this.customerName,
      this.phoneNumber,
      this.email,
      this.address,
    ]);
  }

  static findByName(name) {
    const sql = "SELECT *FROM tblCustomers WHERE customerName = ?";
    return db.execute(sql, [name]);
  }

  static searchByName(name) {
    const sql =
      "SELECT customerName,id FROM tblCustomers WHERE customerName LIKE concat(?,'%')";
    return db.execute(sql, [name]);
  }

  static findAll() {
    const sql = "SELECT *FROM tblCustomers";
    return db.execute(sql);
  }
}

module.exports = Customer;
