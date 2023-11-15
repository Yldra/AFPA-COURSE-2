const express = require("express");
const app = express();
const cors = require("cors");
const jsonfile = require("jsonfile");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const port = 8089;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "session",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : " + err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM user WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Erreur de requête SQL : " + err);
      res.status(500).json({ success: false });
    } else if (results.length === 0) {
      res.status(200).json({ success: false });
    } else {
      const hashedPassword = results[0].password;

      bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptRes) => {
        if (bcryptErr) {
          console.error("Erreur de comparaison de hachage : " + bcryptErr);
          res.status(500).json({ success: false });
        } else if (bcryptRes) {
          res.status(200).json({ success: true });
        } else {
          console.log("Comparaison de mot de passe a échoué.");
          res.status(200).json({ success: false });
        }
      });
    }
  });
});

app.get("/", function (req, res) {
  res.json({ nom: "TOMI", age: 5 });
});

app.get("/jsf", function (req, res) {
  jsonfile.readFile("databases.json", (err, data) => {
    if (err) {
      console.error("Erreur de lecture du fichier JSON : " + err);
      res.status(500).json({ erreur: "Erreur de lecture du fichier JSON" });
    } else {
      res.json(data);
    }
  });
});

app.post("/datas", (req, res) => {
  console.log(req.body);
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log("Le serveur fonctionne sur le port : " + port);
});
