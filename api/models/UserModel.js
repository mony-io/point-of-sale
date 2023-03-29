const db = require("../config/db");

class Users {
  constructor(username, password, email, phone_number, role_id, status_id) {
    (this.username = username),
      (this.password = password),
      (this.email = email),
      (this.phone_number = phone_number);
    this.role_id = role_id;
    this.status_id = status_id;
  }

  save() {
    const sql =
      "INSERT INTO tblUsers(role_id,status_id,username,password,email,phone_number) VALUES(?,?,?,?,?,?)";
    return db.execute(sql, [
      this.role_id,
      this.status_id,
      this.username,
      this.password,
      this.email,
      this.phone_number,
    ]);
  }

  static findAll() {
    const sql = `SELECT tblUsers.id,username,email,phone_number,tblRoles.role_name,tblStatus.status FROM tblUsers 
      INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id
      INNER JOIN tblStatus ON tblUsers.status_id = tblStatus.id
    `;
    return db.execute(sql);
  }

  static findByUsername(username) {
    const sql = `SELECT id,username,email,tblRoles.role_name,password FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id WHERE username = ? AND status_id=1`;
    return db.execute(sql, [username]);
  }

  static findByEmail(email) {
    const sql = `SELECT id,username,email,tblRoles.role_name,password FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id WHERE email = ? AND status_id =1`;
    return db.execute(sql, [email]);
  }

  static updateRefreshToken(id, refreshToken) {
    const sql = "UPDATE tblUsers SET token = ? WHERE id = ?";
    return db.query(sql, [refreshToken, id]);
  }

  static findByRefreshToken(refresh_token) {
    const sql = `SELECT username,email,id,tblRoles.role_name FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id
    WHERE token = ?`;
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
    const sql = `SELECT tblUsers.id,username,email,tblRoles.role_name,tblUsers.role_id,phone_number,password,tblUsers.status_id FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id 
    INNER JOIN tblStatus ON tblUsers.status_id = tblStatus.id
    WHERE tblUsers.id = ?`;
    return db.execute(sql, [id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblUsers WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static updateOne(username, email, phone_number, role_id, status_id, id) {
    const sql =
      "UPDATE tblUsers SET username=?,email=?,phone_number=?,role_id=?,status_id=? WHERE id = ?";
    return db.query(sql, [
      username,
      email,
      phone_number,
      role_id,
      status_id,
      id,
    ]);
  }

  static update_duplicate(id, userName) {
    const sql = "SELECT *FROM tblUsers WHERE NOT id = ? AND username = ?";
    return db.execute(sql, [id, userName]);
  }

  // pagination
  static searchUser(search, limit, page) {
    const sql = 'call SP_SearchProduct(?,?,?)';
    return db.execute(sql, [search, limit, page]);
  }

  static pagination(search) {
    const sql = 'call SP_UserPagination(?)';
    return db.execute(sql, [search]);
  }
}

module.exports = Users;
