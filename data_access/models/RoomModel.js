/**
 * Created by user on 14.04.2017.
 */
var User = require("../models/UserModel")
var Sequelize = require('sequelize');
var sequelizeSingleton = require("../SequelizeSingleton")
var sequelize = new sequelizeSingleton()

var Room = sequelize.define('room', {
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
        unique: true
    }
});
//Room.hasOne(User, { foreignKey: 'owner_id' })
module.exports = Room;