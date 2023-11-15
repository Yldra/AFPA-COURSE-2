const connection = require("./mysqlconfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  createUser: (email, password, callback) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Erreur de hachage du mot de passe : " + err);
        return callback(err, null);
      } else {
        connection.query(
          "INSERT INTO user (email, password) VALUES (?, ?)",
          [email, hash],
          (err, results) => {
            if (err) {
              console.error(
                "Erreur lors de l'insertion des données de l'utilisateur : " +
                  err
              );
              return callback(err, null);
            } else {
              return callback(null, results);
            }
          }
        );
      }
    });
  },

  getUserByEmail: (email, callback) => {
    const query = "SELECT email, password FROM user WHERE email = ?";
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error("Erreur de requête : " + err);
        return callback(err, null);
      } else if (results.length > 0) {
        const utilisateur = results[0];
        return callback(null, utilisateur);
      } else {
        return callback("Utilisateur non trouvé", null);
      }
    });
  },
};
