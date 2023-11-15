const mysql = require("mysql2");

// Exporte la fonction query
module.exports = {
  query: query,
};

// Crée un pool de connexions interne
var pool = mysql.createPoolCluster({ canRetry: true });

// Ajoute la connexion principale
pool.add({
  host: "localhost",
  user: "root",
  password: "",
  database: "session",
});

// Test de la connexion
pool.getConnection(function (err, _connection) {
  if (err) {
    console.error("MySQL connection error: " + err);
    throw new Error("MySQL connection error: " + err);
    process.exit(1);
  }

  console.info("MySQL connection OK");
  _connection.release();
});

// API publique
// query(sql: string [, params: Array], cb: Function)
//   => cb(err, rows, fields)

function query(sql, params, cb) {
  if (typeof params === "function") {
    cb = params;
    params = [];
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      return cb(err);
    }

    connection.query(sql, params, function (err, rows, fields) {
      connection.release();
      cb(err, rows, fields);
    });
  });
}
