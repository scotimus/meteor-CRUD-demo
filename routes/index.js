var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://dbUser:dbUser123@ds123312.mlab.com:23312/cheese';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'John' });
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('products').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.image_url
  };

    mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('products').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');

});



module.exports = router;
