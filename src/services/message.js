const Message = require('../models/Message');
const SenderId = require('../models/SenderId');
const Contact = require('../models/Contact');

class MessageService {

    async getAllMessages(filter={}){
        return Message.find(filter).populate("user");
    }
    async getUserMessages(user, filter={}) {
        return Message.find({user: user.userId, ...filter}).populate("user");
    }

    async getMessage(contactId) {
        return Message.findOne({_id: contactId}).populate("user");
    }

    async createMessage(senderId, content, recipient, user, type = "sms") {
        return (await Message.create({
            from: senderId, content: content, recipient: recipient, type: type,
            user: user.userId, status: "pending"
        })).populate("user");
    }

    async updateMessage(contactId, updatedData) {
        return Message.findByIdAndUpdate(contactId, {
            ...updatedData,
            lastUpdated: new Date()
        }, {new: true}).populate("user");
    }

    async logMessage(senderId, content, user, contactIds = null, contactGroups = null, type = "sms") {

        const senderId_ = await SenderId.findOne({"_id": senderId})
        const senderIdCode = senderId_.code

        if (!senderIdCode) {
            return
        }
        let recipients = [];

        if (contactIds) {
            recipients = await Contact.find({_id: {"$in": contactIds}})
        }
        if (contactGroups) {
            recipients = await Contact.find({"group": {"$in": contactGroups}})
        }

        recipients.forEach(recipient => {
            this.createMessage(senderIdCode, content, recipient.phoneNumber, user, type)
        })

        return {"status": "queued"}
    }

    async deleteMessage(contactId) {
        return Message.findByIdAndDelete(contactId);
    }
}

module.exports = new MessageService();
