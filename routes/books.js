var express = require('express');
var router = express.Router();
var path = require('path');

var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://wptugffjhbpqta:V8lvqBLY6Ry12tRP0GW7mQ87Zj@ec2-54-83-40-119.compute-1.amazonaws.com:5432/d6b88ef20b57to?ssl=true'
});

// GET just one book_id
router.get('/:id', function(req, res, next){
  var book_id = req.params.id;
  knex('books').select().where('id', '=', book_id).then(function(book_id){
    res.json({book_id: book_id});
  })
})

// DELETE a book
router.get('/delete/:id', function(req,res,next){
  var book_id = req.params.id
  knex('books').first().where('id', '=', book_id).del().then(function(book_id){
    res.redirect('/books.html')
  })
})

// go to add a book page
router.get('/addbook', function(req,res,next){
  res.redirect('/addbook.html')
})

// update a book


// Add a book
router.post('/submitbook', function(req, res, next){
  knex('books').insert({
    id: req.body.id,
    title: req.body.title,
    genre: req.body.genre,
    cover_url: req.body.cover_url,
    description: req.body.description
  }, 'title').then(function(title){
    res.redirect('/books.html')
  })
})



module.exports = router;
