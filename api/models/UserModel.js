const db = require("../config/db");

class Users {
  constructor(
    firstName,
    lastName,
    username,
    password,
    email,
    phone_number,
    role_id
  ) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.username = username),
      (this.password = password),
      (this.email = email),
      (this.phone_number = phone_number);
    this.role_id = role_id;
  }

  save() {
    const sql =
      "INSERT INTO tblUsers(role_id,firstName,lastName,username,password,email,phone_number) VALUES(?,?,?,?,?,?,?)";
    return db.execute(sql, [
      this.role_id,
      this.firstName,
      this.lastName,
      this.username,
      this.password,
      this.email,
      this.phone_number,
    ]);
  }

  static findAll() {
    const sql =
      "SELECT firstName,lastName,username,password,email,phone_number FROM tblUsers";
    return db.execute(sql);
  }

  static findByUsername(username) {
    const sql = "SELECT *FROM tblUsers WHERE username = ?";
    return db.execute(sql, [username]);
  }

  static findByEmail(email) {
    const sql = "SELECT *FROM tblUsers WHERE email = ?";
    return db.execute(sql, [email]);
  }

  static updateRefreshToken(id, refreshToken) {
    const sql = "UPDATE tblUsers SET token = ? WHERE id = ?";
    return db.query(sql, [refreshToken, id]);
  }

  static findByRefreshToken(refresh_token) {
    const sql = "SELECT *FROM tblUsers WHERE token = ?";
    return db.execute(sql, [refresh_token]);
  }

  static findByTokenAndId(token, id) {
    const sql = "SELECT *FROM tblUsers WHERE token = ? AND id=?";
    return db.execute(sql, [token, id]);
  }

  static updatePassword(password, id) {
    const sql = "UPDATE tblUsers SET password = ? WHERE id=?";
    return db.query(sql, [password, id]);
  }

  static findById(id) {
    const sql = "SELECT *FROM tblUsers WHERE id = ?";
    return db.execute(sql, [id]);
  }
}

module.exports = Users;
