/**
 * Created by user on 13.04.2017.
 */
var sequelize = require('Sequelize')

var SequelizeSingleton = function() {
    if (this._instance) {
        return this._instance;
    }
    this._instance = new sequelize('postgres://api:api@localhost:5432/chat');
    return this._instance
}
module.exports = SequelizeSingleton;