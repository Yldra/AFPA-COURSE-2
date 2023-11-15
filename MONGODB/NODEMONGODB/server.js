const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(express.json());
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);
let db;

async function go() {
try {
  conn = await client.connect();
  db = conn.db("school");
} catch (e) {
  console.error(e);
}
}
go() 

// Creer 
app.post("/create-user", async(req, res) =>{
  
})

app.get("/create-user", async (req, res) => {
  let collection = await db.createCollection("students");
  collection.insertOne({nom : 'Hamid'}); 
  res.json({message :'Création ok'});
});

// Update
app.get("/update-user", async (req, res) => {
  let query = {nom :'Hamid'};
  let update = {nom : 'Michel'};
  await db.collection('school').updateOne(query, {$set:update});
  res.json({message :'modification ok'});
});

app.listen(3030,() => console.log('Listen on 3030'))