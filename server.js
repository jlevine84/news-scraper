const express = require('express')
const hbars = require('express-handlebars')
const mongoose = require('mongoose')
const db = require('./models')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", hbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(require('./routes/appRoutes')(db))

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});