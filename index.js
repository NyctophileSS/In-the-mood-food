import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js"
dotenv.config();

// const express = require('express');
// const path = require('path');
const PORT = process.env.PORT || 8000;
const MongoClient = mongodb.MongoClient;


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
    await RestaurantsDAO.injectDB(client)
    app.listen(PORT, () => {
      console.log(`listening on port: ${ PORT }`)
    })
})


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .use(cors())
//   .use(express.json())
//   .use("/api/v1/login", login)
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')s
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  