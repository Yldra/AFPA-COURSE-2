const express = require("express");
const jsonfile = require("jsonfile");

const app = express();

const bdd = require("./models/poolanimal.js");

// middleware, s'exécute à chaque requête (mais après, on peut mettre des options, par exemple, ne s'exécuter que sur des get, ou des post...) :
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// les templates
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//routage
app.get("/", (req, res) => res.render("index"));

app.get("/datas1", (req, res) => {
  res.render("datas1", { resultat: "une chaîne de donnees" });
});

app.get("/datas2/:param1/:param2", (req, res) => {
  res.render("datas2", { p1: req.params.param1, p2: req.params.param2 });
});

app.get("/datas3", (req, res) => {
  let datas3 = jsonfile.readFileSync("models/datas3.json");
  console.log(typeof datas3);
  res.render("datas3", datas3);
});

// même chose que /datas3, mais en mode asynchrone :
app.get("/datas4", (req, res) => {
  jsonfile.readFile("models/datas3.json", function (err, datas) {
    if (err) {
      throw err;
    }
    res.render("datas3", datas);
  });
});

// même chose, en asynchone, MAIS AVEC DES PROMESSES :
app.get("/datas5", (req, res) => {
  jsonfile
    .readFile("models/datas3.json")
    .then((datas3) => {
      res.render("datas3", datas);
    })
    .catch((err) => {
      throw err;
    });
});

// Liste des animaux
app.get("/animaux", (req, res) => {
  bdd.findAll((rows) => {
    console.log(rows);
    res.render("animaux", { animaux: rows });
  });
});

// Détail d'un animal
app.get("/animal/:id", (req, res) => {
  const animalId = req.params.id;

  bdd.findOne(animalId, (row) => {
    res.render("animal", { animal: row[0] });
  });
});

// Une page d'accueil
app.get("/index", (req, res) => {
  res.render("index");
});

// Formulaire de Création d'un Animal dans la BDD
app.get("/form_crea", (req, res) => {
  res.render("form_crea");
});

// Création puis redirection vers Animaux
app.post("/crea_animal", (req, res) => {
  // console.log(req.body);
  bdd.crea_animal(req.body, () => res.redirect("animaux"));
});

// Formulaire de Modification d'un Animal dans la BDD
app.get("/form_modif/:id", (req, res) => {
  const animalId = req.params.id;
  bdd.findOne(animalId, (row) => {
    res.render("form_modif", { animal: row[0] });
  });
});

// Modification puis redirection vers Animaux
app.post("/modif_animal/:id", (req, res) => {
  const animalId = req.params.id;
  const updateAnimal = {
    nom: req.body.nom,
    image: req.body.image,
    description: req.body.description,
    espece: req.body.espece_id,
    id: animalId,
  };
  bdd.modif_animal(updateAnimal, () => res.redirect("animaux"));
});

// Suppression d'un Animal
app.get("/suppr_animal/:id", (req, res) => {
  const animalId = req.params.id;
  bdd.suppr_animal(animalId, () => res.redirect("/animaux"));
});

app.listen(8088, () => console.log("listening on 8088"));
