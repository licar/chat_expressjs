/**
 * Created by user on 13.04.2017.
 */
var Room = require("../models/RoomModel")

module.exports = {
    create : function(name, owner) {
        Room.sync({force: true}).then(function () {
            return Room.create({
                name: name,
                owner_id: owner.id
            });
        });
    },

    get : function(name, owner) {
        Room.sync({force: true}).then(function () {
            return Room.find({
                where: {
                    name: name
                }
            });
        });
    }
}


