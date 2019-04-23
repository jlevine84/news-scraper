const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = (db) =>{

  router.get('/', (req, res) => {
    db.Article.find({saved: false}).then(dbArticles => {
      const articles = {
        articles: dbArticles
      }
      res.render('index', articles);
    }).catch(err => {
      res.json(err)
    })
    
  });

  router.get('/scrape', (req, res)=>{
    axios.get("https://www.nytimes.com").then(response => {
      const $ = cheerio.load(response.data)

      $("div .css-6p6lnl").each((i, element) => {
        const results = {}
        results.title = $(element).children("a").children("div").children("h2").text()
        results.link = $(element).children("a").attr("href")
        db.Article.create(results).then(articles => {
        }).catch(err => {
          console.log(err)
        })
      })
      
    })
    res.send("Scrape Complete")
  })

  router.delete('/scrape', (req, res)=> {
    db.Article.remove({}).then(results => {
      res.render('index')
    })

  })

  router.get('/saved', (req, res)=>{
    db.Article.find({saved: true}).then(dbArticles => {
      const articles = {
        articles: dbArticles
      }
      res.render('saved', articles);
    }).catch(err => {
      res.json(err)
    })
  })

  router.put('/saved/:id', (req, res)=> {
    db.Article.updateOne({_id: req.params.id}, {$set: {saved: req.body.saved}}).then(results => {
      res.send(`Article: ${req.params.id} saved.`)
    }).catch(err => {
      console.log(err)
    })
  })

  router.get('/comment/:id', (req, res)=> {
    db.Article.findOne({_id: req.params.id}).populate("comments").then(dbArticles => {
      const article = {
        article: dbArticles
      }
      res.render('comments', article);
    }).catch(err => {
      console.log(err)
    })
  })

  router.post('/comment/:id', (req, res)=> {
    db.Comment.create(req.body)
    .then(dbComment => {
      return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then(dbArticles => {
    })
    .catch(err => {
      res.json(err);
    });
  })

  return router  
}