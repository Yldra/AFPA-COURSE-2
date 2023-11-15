const mysql = require("mysql2");

// Crée un pool de connexions
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "session",
});

// Test de la connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error: " + err);
    throw new Error("MySQL connection error: " + err);
  }

  console.info("MySQL connection OK");
  connection.release();
});

// API publique
function query(sql, params, cb) {
  if (typeof params === "function") {
    cb = params;
    params = [];
  }

  pool.getConnection((err, connection) => {
    if (err) {
      return cb(err);
    }

    connection.query(sql, params, (err, rows, fields) => {
      connection.release();
      cb(err, rows, fields);
    });
  });
}

// Exporte la fonction query
module.exports = {
  query: query,
};
