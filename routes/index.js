var express = require('express');
var router = express.Router();
var contextService = require('request-context');
var set = require("collections/set");
var List = require("collections/list");
var messages = new List();
var sequelizeSingleton = require("../data_access/SequelizeSingleton")
var sequelize = new sequelizeSingleton()
var Sequelize = require('sequelize');

var userRepository = require("../data_access/repositories/UserRepository")
var roomRepository = require("../data_access/repositories/RoomRepository")
var messageRepository = require("../data_access/repositories/MessageRepository")

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        res.redirect('/chat')
    }else{
        res.render('index');
    }
    res.end();
});

router.get('/createAccount', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    userRepository.create(username, password, function (responce){
        var lol = responce
        req.session.username = username;
        res.redirect('/chat');
    })
    res.end();
});

router.post('/login', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    if (userRepository.get(username, password) != null){
        req.session.username = username;
        res.redirect('/chat');
    }
    res.end();
});

router.get('/logout', function(req, res, next) {
    var user = req.session.username;
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

router.post('/send', function(req, res, next) {
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
    res.end();
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
