const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

module.exports = (db) =>{

  router.get('/', (req, res) => {
      res.render('index');
  });

  router.get('/scrape', (req, res)=>{
    axios.get("https://www.nytimes.com").then(response =>{
      const $ = cheerio.load(response.data)

      $("div .css-6p6lnl").each((i, element) =>{
        const results = {}
        results.title = $(element).children("a").children("div").children("h2").text()
        results.link = $(element).children("a").attr("href")
        //TODO: Post Article to DB
      })
      
    })
    res.send("Scrape Complete")
  })

  router.get('/saved', (req, res)=>{

  })

  router.post('/saved', (req, res)=>{
    
  })

  router.get('/comment', (req, res)=>{

  })

  router.post('/comment', (req, res)=>{

  })

  return router  
}