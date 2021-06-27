import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import login from "./api/login.route.js";


const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const MongoClient = mongodb.MongoClient;

dotenv.config();

MongoClient.connect(
  process.env.DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true
  }
).catch(err => {
  console.error(err.stack)
  process.exit(1)
}).then(async client => {
  express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use(express.json())
  .use("/api/v1/login", login)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
})



  