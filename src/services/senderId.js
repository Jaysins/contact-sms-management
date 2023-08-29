const SenderId = require('../models/SenderId');

class senderIdService {
    async getAllSenderIds(user) {
        return SenderId.find({user: user.userId}).populate("user").populate("group");
    }

    async getSenderId(senderId) {
        return SenderId.findOne({_id: senderId}).populate("user").populate("group");
    }

    async createSenderId(name, group, user) {

        return (await SenderId.create({name, code:name.toLowerCase(), user: user.userId, group: group})).populate("user");
    }

    async updateSenderId(senderId, updatedData) {

        return SenderId.findByIdAndUpdate(senderId, {
            ...updatedData,
            code: name.toLowerCase(),
            lastUpdated: new Date()
        }, {new: true}).populate("user");
    }

    async deleteSenderId(senderId) {
        return SenderId.findByIdAndDelete(senderId);
    }
}

module.exports = new senderIdService();
