const express = require('express')
const hbars = require('express-handlebars')
const mongojs = require('mongojs')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const PORT = process.env.PORT || 8080
const databaseUrl = "scraper";
const collections = ["news-scraper"];

const db = mongojs(databaseUrl, collections);
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", hbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(require('./routes/appRoutes')(db))

db.on("error", (error)=> {
  console.log("Database Error:", error);
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});