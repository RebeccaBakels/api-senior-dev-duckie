const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const {getQuacks, postQuack} = require('./src/quack-index')

const app = express()
app.use(cors())

app.get('/quacks/:userId', getQuacks)
app.post('/quacks/userId', postQuack)

exports.app = functions.https.onRequest(app)
