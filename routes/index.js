var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var user = req.param('user');
    var password = req.param('password');
    var sess = req.session;
    sess.username = user;
});

router.post('/logout', function(req, res, next) {
    var sessin = req.session;
    sessin.destroy();
});

router.get('/chat', function(req, res, next) {
    if (!req.sessin.username){
        res.redirect('/')
    }else{
        res.render('index', { title: 'Express' });
    }
});

module.exports = router;
