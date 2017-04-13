/**
 * Created by user on 13.04.2017.
 */
var Message = require("../models/MessageModel")

module.exports = {
     create: function(text, owner_id, room_id) {
        Message.sync({force: true}).then(function () {
            return Message.create({
                text: text,
                owner_id: owner_id,
                room_id: room_id
            });
        });
    },

    get: function(room_id) {
        Message.sync({force: true}).then(function () {
            return Message.find({
                where: {
                    room_id: room_id
                }
            });
        });
    }
}
