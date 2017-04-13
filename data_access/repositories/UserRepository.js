/**
 * Created by user on 13.04.2017.
 */
var User = require("../models/UserModel")

module.exports = {
    create : function(username, password, callback) {
        User.sync({force: true}).then(function () {
            callback(User.create({
                userName: username,
                password: password
            }));
        })
    },

    get : function(username, password) {
        User.sync({force: true}).then(function () {
            return User.find({
                where: {
                    username: username,
                    password: password
                }
            });
        });
    }
}


