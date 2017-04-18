/**
 * Created by user on 14.04.2017.
 */
var Sequelize = require('sequelize');
var sequelizeSingleton = require("../SequelizeSingleton")
var sequelize = new sequelizeSingleton()

// var User = sequelize.define('usel', {
//     userName: {
//         type: Sequelize.STRING,
//         field: 'username',
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         field: 'password',
//         allowNull: false
//     }
// });
var User = function(username, password) {
    this.username = username
    this.password = password
}
module.exports = User;