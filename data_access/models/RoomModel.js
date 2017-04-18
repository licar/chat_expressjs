/**
 * Created by user on 14.04.2017.
 */
var User = require("../models/UserModel")
var Sequelize = require('sequelize');
var sequelizeSingleton = require("../SequelizeSingleton")
var sequelize = new sequelizeSingleton()
var User = require("../models/UserModel")
var Map = require("collections/map");
var Set = require("collections/set");
var List = require("collections/List");

// var Room = sequelize.define('room', {
//     name: {
//         type: Sequelize.STRING,
//         field: 'name',
//         allowNull: false,
//         unique: true
//     }
// });
//Room.hasOne(User, { foreignKey: 'owner_id' })
var Room = function (name, owner) {
    this.name = name
    this.owner = owner
    this.banned = new Set()
    this.messages = new List()
    this.users = new List()
}
module.exports = Room;