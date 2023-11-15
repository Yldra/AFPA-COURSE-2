const express = require("express");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");
const pool = require("./models/pool"); // Importez le module pool.js

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 10000 },
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware pour gérer la session expirée
app.use((req, res, next) => {
  if (req.session.user) {
    req.session.message =
      "Vous êtes connecté avec le compte " + req.session.user;
  } else {
    req.session.message = "Votre session a expiré ou vous n'êtes pas connecté.";
  }
  next();
});

// Routage
app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("index.ejs", {
      message: "Vous êtes connecté avec le compte " + req.session.user,
    });
  } else {
    res.render("index.ejs", { message: "Vous n'êtes pas connecté." });
  }
});

app.get("/inscription", (req, res) => {
  res.render("inscription.ejs");
});

app.post("/inscription", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmationpassword = req.body.confirmationpassword;

  if (password !== confirmationpassword) {
    res.render("inscription.ejs", {
      erreur: "Les mots de passe ne correspondent pas.",
    });
  } else {
    pool.createUser(email, password, (err, results) => {
      if (err) {
        console.error("Erreur lors de la création de l'utilisateur : " + err);
        res.redirect("/inscription");
      } else {
        res.redirect("/connexion");
      }
    });
  }
});

app.get("/connexion", (req, res) => {
  res.render("connexion.ejs");
});

app.post("/connexion", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.getUserByEmail(email, (err, utilisateur) => {
    console.log(utilisateur);
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur : " + err);
      res.render("connexion.ejs", { erreur: "Une erreur s'est produite" });
    } else {
      bcrypt.compare(password, utilisateur.password, (compareErr, match) => {
        if (compareErr) {
          console.error(
            "Erreur lors de la comparaison du mot de passe : " + compareErr
          );
          res.render("connexion.ejs", { erreur: "Une erreur s'est produite" });
        } else if (match) {
          req.session.user = email;
          req.session.message = "Vous êtes connecté avec le compte " + email;
          res.redirect("/index"); // Redirige vers la page "index"
        } else {
          res.render("connexion.ejs", { erreur: "Mot de passe incorrect" });
        }
      });
    }
  });
});

app.get("/deconnexion", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/connexion");
  });
});

app.get("/index", (req, res) => {
  if (req.session.user) {
    res.render("index.ejs", {
      message: "Vous êtes connecté avec le compte " + req.session.user,
    });
  } else {
    res.render("index.ejs", { message: "Vous n'êtes pas connecté." });
  }
});

app.listen(8085);
