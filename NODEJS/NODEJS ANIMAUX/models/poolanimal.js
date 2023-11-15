const connection = require("./mysqlconfig.js");

exports.findAll = function (callback) {
  connection.query("SELECT * FROM animal", (err, rows) => {
    callback(rows);
  });
};

exports.findOne = function (id, cb) {
  connection.query("SELECT * FROM animal WHERE id = " + id, (err, row) => {
    if (err) throw err;
    cb(row);
  });
};

exports.crea_animal = function (animal, cb) {
  connection.query(
    "INSERT INTO animal (nom,description,image,espece_id) VALUES (?,?,?,?)",
    [animal.nom, animal.description, animal.image, animal.espece_id],
    (err, row) => {
      if (err) throw err;
      cb();
    }
  );
};

exports.modif_animal = function (animal, cb) {
  connection.query(
    "UPDATE animal SET nom = ?, description = ?, image = ?, espece_id = ? WHERE id = ?",
    [animal.nom, animal.description, animal.image, animal.espece, animal.id],
    (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la modification de l'animal : " + err.message
        );
        cb(err);
      } else {
        console.log("Animal modifié avec succès.");
        cb(null);
      }
    }
  );
};

exports.suppr_animal = function (animalId, cb) {
  const query = "DELETE FROM animal WHERE id = ?";
  connection.query(query, [animalId], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la suppression de l'animal : " + err.message
      );
      cb(err);
    } else {
      console.log("Animal supprimé avec succès.");
      cb(null);
    }
  });
};
