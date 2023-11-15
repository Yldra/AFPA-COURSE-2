const mysql  = require('mysql2');

// module.exports met à disposition la fonction query :
module.exports = {
  "query": query
};
// Internal connection pool
var pool = mysql.createPoolCluster({"canRetry": true });

// Add main connection
pool.add({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'animaux'
});

// Test de la connection
pool.getConnection(function (err, _connection) {
  if (err) {
    throw new Error("MySQL connection error: " + err);
    process.exit(1);
  }

  console.info("MySQL connection OK");
  _connection.release();
});

// Public API
// query(sql: string [, params: Array], cb: Function)
//   => cb(err, rows, fields)

function query (sql, params, cb) {
  if (typeof params === 'function') {
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

