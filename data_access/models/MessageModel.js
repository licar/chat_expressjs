/**
 * Created by user on 14.04.2017.
 */
var User = require("../models/UserModel")
var Room = require("../models/RoomModel")
var Sequelize = require('sequelize');
var sequelizeSingleton = require("../SequelizeSingleton")
var sequelize = new sequelizeSingleton()

var Message = sequelize.define('room', {
    text: {
        type: Sequelize.STRING,
        field: 'name'
    }
});
// Message.hasOne(User, { foreignKey: 'owner_id' })
// Message.hasOne(Room, { foreignKey: 'room_id' })
module.exports = Message;