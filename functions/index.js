const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const { getQuacks, postQuack } = require("./src/quack-index");
app.use(cors());
app.use(bodyParser.json());




// app.get("/quacks", getQuacks);

app.get('/quacks/:userId', getQuacks)
app.post('/quacks/:userId', postQuack)

exports.app = functions.https.onRequest(app);
