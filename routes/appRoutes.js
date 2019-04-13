const router = require('express').Router()

module.exports = (db) =>{

  router.get('/', (req, res) => {
      res.render('index');
  });

  router.get('/scrape', (req, res)=>{
    res.json()
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