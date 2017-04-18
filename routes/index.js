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
//-----------------------------------
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
    // if (userRepository.login(username, password) != null){
    //     req.session.username = username;
    //     res.redirect('/chat');
    // }
    // res.end();
    userRepository.register(username, password, function (user) {
        req.session.user = user;
        res.redirect('/chat');
        res.end()
    })
});

router.post('/login', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    // if (userRepository.login(username, password) != null){
    //     req.session.username = username;
    //     res.redirect('/chat');
    // }
    // res.end();
    userRepository.login(username, password, function (user) {
        req.session.user = user;
        res.redirect('/chat');
        res.end()
    })
});

router.get('/logout', function(req, res, next) {
    var user = req.session.user
    if (user) {
        var name = req.param('name');
        roomRepository.out(name, user, function () {
            req.session.destroy();
            res.redirect('/');
            res.end();
        })

    }
});

router.get('/remove', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.delete(user, name, function () {
        res.redirect('/chat')
        res.end();
    })
});

//------------------------------
router.get('/chat', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/')
    }else{
        res.render('chat-list');
    }
    res.end();
});

router.post('/chat/create', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.create(user, name, function () {
        res.redirect('/chat/enter?name=' + name)
        res.end();
    })
});

router.get('/chat/enter', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.get(user, name, function (name) {
        res.redirect('/showchat?name=' + name)
        res.end();
    })
});

router.get('/showchat', function(req, res, next) {
    var user = req.session.user
    if (!user) {
        res.redirect('/')
    } else {
        var name = req.param('name');
        res.render('chat', {
            users : 'getUsers?name=' + name,
            messages : 'getMessages?name=' + name,
            send : 'send?name=' + name,
            logout : 'logout?name=' + name,
            remove : 'remove?name=' + name
        });
    }
    res.end();
})
//-------------------------
router.post('/send', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var text = req.param('text');
    var name = req.param('name');
    roomRepository.addMessage(name, text, user, function (result) {
        res.send(result)
        res.end()
    });
    res.end();
});

router.post('/getMessages', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.getMessages(name, user, function (result) {
        res.send(result)
        res.end()
    });
});

router.post('/getUsers', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.getUsers(name, user, function (result) {
        res.write(result);
        res.end();
    });
});

router.get('/ban', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    var username = req.param('username')
    roomRepository.ban(user, username, name, function () {
        res.end();
    })
});

//-----------------------------------------
module.exports = router;
