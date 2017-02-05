var express = require('express');
var router = express.Router();
var contextService = require('request-context');
var set = require("collections/set");
var List = require("collections/list");
var users = new List();
var messages = new List();
    
/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        res.redirect('/chat')
    }else{
        res.render('index', { title: 'Express' });
    }
    res.end();
});

router.post('/login', function(req, res, next) {
    var user = req.param('user');
    var password = req.param('password');
    if (password == '1' && !users.has(user)){
        req.session.user = user;
        users.add(user);
    }
    res.redirect('/chat');
    res.end();
});

router.get('/logout', function(req, res, next) {
    var user = req.session.user;
    users.delete(user);
    req.session.destroy();
    res.redirect('/');
    res.end();
});

router.get('/chat', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/')
    }else{
        res.render('chat', { title: 'Express' });
    }
    res.end();
});

router.post('/sendMessage', function(req, res, next) {
    var message  =  {
        text : req.param('text'),
        user : req.session.user
    };
    messages.push(message);
    res.end();
});

router.post('/getMessages', function(req, res, next) {
    res.send(prepareMessages());
});

router.post('/getUsers', function(req, res, next) {
    res.send(prepareUsers());
});

function prepareMessages() {
    var result = '';
    messages.toArray().forEach(function (item, i, arr){
       result += '<dt>' + item.user + '</dt>';
       result += '<dd>' + item.text + '</dd>';
    });
    return result;
}

function prepareUsers() {
    var result = '';
    users.toArray().forEach(function (item, i, arr){
        if (item) result += "<h4>" + item + "</h4>"
    });
    return result;
}

module.exports = router;
