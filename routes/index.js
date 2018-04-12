var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    css: 'index'
  });
});

router.get('/vote', function(req, res) {
  res.render('vote', {
    title: 'Vote',
    css: 'vote'
  });
});

router.get('/linker', function(req, res) {
  res.render('linker');
});

router.get('/mask', function (req, res) {
  res.render('mask', {
    css: 'mask'
  });
});

router.get('/main', (req, res) => {
  res.render('main', {
    css: 'main'
  });
});

module.exports = router;
