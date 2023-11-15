const express = require("express");
const jsonfile = require('jsonfile');
const app = express();

// Middleware express.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des templates
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Routage
app.get("/", (req, res) => res.render("index"));

app.get("/datas1", (req, res) => {
  res.render("datas1", { resultat: "une chaine de données" });
});

app.get("/datas2/:param1/:param2", (req, res) => {
  res.render("datas2", { p1: req.params.param1, p2: req.params.param2 });
});

app.get('/datas3', (req,res) => {
    let datas3 = jsonfile.readFileSync('models/datas3.json');
    console.log(datas3)
    res.render('datas3', datas3)
});

app.listen(8088, () => console.log('Listening on 8088'));
