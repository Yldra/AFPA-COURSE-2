if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Importing libraries that we installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// Local storage of users (try to connect to database next)
const users = [];

app.set("view-engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 4000 }, // durée de vie de la session
    resave: false, // resave in our session if nothing has changed
    saveUninitialized: false, // save an empty value into the session if there's no value
  })
);
app.use(passport.initialize());
app.use(passport.session());

// # Route
// Home
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Brian" });
});

// Login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Register
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users); // after register display the user(s) in the console
});

// Server Listening
app.listen(3000);
