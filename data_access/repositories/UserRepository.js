/**
 * Created by user on 13.04.2017.
 */
var Map = require("collections/map");
var User = require("../models/UserModel")
var users = new Map();


module.exports = {
    // create : function(username, password, callback) {
    //     User.sync({force: true}).then(function () {
    //         callback(User.create({
    //             userName: username,
    //             password: password
    //         }));
    //     })
    // },
    //
    // get : function(username, password) {
    //     User.sync({force: true}).then(function () {
    //         return User.find({
    //             where: {
    //                 username: username,
    //                 password: password
    //             }
    //         });
    //     });
    // }

    register : function (username, password, callback)  {
        var user = users.get(username)
        if (user !== undefined ){
            throw "User is aleready exists"
        }

        var user = new User(username, password)
        users.set(username, user)
        callback(user)
        //add to session
    },

    login : function (username, password, callback) {
        var user = users.get(username)
        if (!user || user.password !== password){
            throw "Incorrect auth data"
        }
        callback(user)
        //add to session
    }

}


