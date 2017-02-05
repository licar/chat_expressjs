var express = require('express');
var router = express.Router();
var contextService = require('request-context');
var set = require("collections/set");
var users = new Set();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var user = req.param('user');
    var password = req.param('password');
    if (password == '1'){
        req.session.user = user;
        users.add(user);
    }
    res.end();
});

router.get('/logout', function(req, res, next) {
    var user = req.session.user;
    users.delete(user);
    req.session.destroy();
    req.end();
    req.redirect('/');
});

router.get('/chat', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/')
    }else{
        res.render('index', { title: 'Express' });
    }
});

module.exports = router;
