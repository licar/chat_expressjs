var express = require('express');
var router = express.Router();
var contextService = require('request-context');
var set = require("collections/set");
var List = require("collections/list");
var users = new Set();
var messages = new List();
    
/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        res.redirect('/chat')
    }else{
        res.render('index', { title: 'Express' });
    }
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

router.post('/sendMessage', function(req, res, next) {
    var message  =  {
        text : req.param('text'),
        user : req.session.user
    };
    messages.push(message);

});

router.post('/getMessages', function(req, res, next) {
    res.send(JSON.stringify(messages));
});

router.post('/getUsers', function(req, res, next) {
    res.send(JSON.stringify(users));
});

module.exports = router;
