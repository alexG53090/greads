var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://wptugffjhbpqta:V8lvqBLY6Ry12tRP0GW7mQ87Zj@ec2-54-83-40-119.compute-1.amazonaws.com:5432/d6b88ef20b57to?ssl=true'
});

// GET all authors
router.get('/', function(req,res,next){
  knex('authors').select().then(function(authors){
    res.status(200).json({authors:authors});
  })
})

// DELETE an auhtor
router.get('/delete/:id', function(req,res,next){
  var author_id = req.params.id;
  knex('authors').select().where('id', '=', author_id).del()
  .then(function(author_id){
    res.redirect('/authors.html')
  })
})

// go to add an author pager
router.get('/addauthor', function(req,res,next){
  res.redirect('/addauthor.html')
})

// CREATE an author
router.post('/submitauthor', function(req,res,next){
  knex('authors').insert({
    id: req.body.id,
    book_id: req.body.book_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  }, 'id').then(function(id){
    res.redirect('/authors.html')
  })
})

// Update and Author
router.get('/edit/:id', function(req,res,next){
  knex('authors').select().then(function(authors){
    res.status(200).json({authors:authors});
  })
})

module.exports = router;
