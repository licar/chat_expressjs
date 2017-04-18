/**
 * Created by user on 19.04.2017.
 */
var express = require('express');
var router = express.Router();
var contextService = require('request-context');
var roomRepository = require("../data_access/repositories/RoomRepository")
router.get('/', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/')
    }else{
        res.render('chat-list');
    }
    res.end();
});

router.post('chat/create', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.create(user, name, function () {
        res.redirect('/enter?name=' + name)
        res.end();
    })
});

router.post('chat/enter', function(req, res, next) {
    var user = req.session.user
    if (!user){
        res.redirect('/')
    }
    var name = req.param('name');
    roomRepository.get(user, name, function () {
        res.redirect('chat?name=' + name)
        res.end();
    })
});