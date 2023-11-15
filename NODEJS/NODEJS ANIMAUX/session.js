const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({     
        secret: 'keyboard cat', // souvent une phrase qui sert à crypter
        cookie: { maxAge: 4000 }, // durée de vie de la session
        resave: false ,
        saveUninitialized: false // stockage en base de données. 
}))
//
// resave : iutilisé pour les sessionStore (pas nécessaire ici )
// saveUninitialized
// 
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>nombre de vues: ' + req.session.views + '</p>')
    res.write('<p>expire dans  ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.setHeader('Content-Type', 'text/html')
    res.write('Bienvenue !')
    res.write('<p>nombre de vues: ' + req.session.views + '</p>')
    res.end();
  
  }
})
app.listen(8085)