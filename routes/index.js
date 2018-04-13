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

router.post('/elector', (req, res) => {
  console.log('I GOT IT!', req.body);
  const resData = {
    'msg': '나는야 메세지',
    'token': '토큰토큰'
  };
  res.json(resData);
});

router.post('/elector/code', (req, res) => {
  console.log('I GOT IT!', req.body);
  const resData = {
    'elect': 'You be a elector'
  };
  res.json(resData);
});



module.exports = router;
