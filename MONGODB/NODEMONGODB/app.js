const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(express.json());
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);
let db;