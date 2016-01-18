var express = require('express');
var router = express.Router();

var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://wptugffjhbpqta:V8lvqBLY6Ry12tRP0GW7mQ87Zj@ec2-54-83-40-119.compute-1.amazonaws.com:5432/d6b88ef20b57to?ssl=true'
});

router.get('/', function(req,res,next){
  res.redirect('/index.html')
})

module.exports = router;
