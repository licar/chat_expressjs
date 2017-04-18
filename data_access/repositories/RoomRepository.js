/**
 * Created by user on 13.04.2017.
 */
var Room = require("../models/RoomModel")
var Map = require("collections/map");
var rooms = new Map();
var Message = require("../models/MessageModel");
module.exports = {
    // create : function(name, owner) {
    //     Room.sync({force: true}).then(function () {
    //         return Room.create({
    //             name: name,
    //             owner_id: owner.id
    //         });
    //     });
    // },
    //
    // get : function(name, owner) {
    //     Room.sync({force: true}).then(function () {
    //         return Room.find({
    //             where: {
    //                 name: name
    //             }
    //         });
    //     });
    // }
    create : function (user, name, callback) {
        if (rooms.get(name)){
            throw "Room already excists"
        }
        rooms.set(name, new Room(name, user))
        callback(name)
    },

    delete : function (user, name, callback) {
        var room = rooms.get(name)
        if (!room) {
            throw "Room is not exsists"
        }
        if (room.owner.username !== user.username){
            throw "You are not owner"
        }
        rooms.delete(name)
        callback()
    },

    ban : function (owner, username, name, callback) {
        var room = rooms.get(name)
        if (!room) {
            throw "Room is not exsists"
        }
        if (room.owner.username !== owner.username){
            throw "You are not owner"
        }
        if (username === room.owner.username){
            throw "You can not ban yourself"
        }
        room.banned.add(username)
        room.users.delete(username)
        callback()
    },

    addMessage : function (name, text, user) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        if (room.banned.has(user.username)){
            throw "You have not access to resource"
        }
        room.messages.add(new Message(text, user))
    },

    getMessages : function (name, user, callback) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        if (room.banned.has(user.username)){
            throw "You have not access to resource"
        }
        this.prepareMessages(name, function (result) {
            callback(result)
        })
    },

    getUsers : function (name, user, callback) {
        var room = rooms.get(name)
        if (room === null){
            throw "Room is not exsists"
        }
        if (room.banned.has(user.username)){
            throw "You have not access to resource"
        }
        this.prepareUsers(name, function (result) {
            callback(result)
        })
    },

    get : function (user, name, callback) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        if (room.banned.has(user.name)){
            throw "You have not access to resource"
        }
        var hasUser =  room.users.has(user.username)
        if (!hasUser){
            room.users.push(user.username)
        }
        callback(name)
    },

    out : function (name, user, callback) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        room.users.delete(user.username)
        callback()
    },

    prepareMessages : function (name, callback) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        var result = ''
        room.messages.toArray().forEach(function (item, i, arr){
            result += '<dt>' + item.owner.username + '</dt>';
            result += '<dd>' + item.text + '</dd>';
        });
        callback(result)
    },

    prepareUsers : function (name, callback) {
        var room = rooms.get(name)
        if (!room){
            throw "Room is not exsists"
        }
        var result = ''
        room.users.toArray().forEach(function (item, i, arr){
            if (item) result +=  '<div></div><a href="/ban?name=' + room.name + '&username=' + item + '"> <h4>' + item + '</h4> </a><div>'
            //if (item) result +=  item
        });
        callback(result)
    }
}


