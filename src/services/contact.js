const Contact = require('../models/Contact');

class ContactService {

    async getAllContacts(user) {
        return Contact.find({user: user.userId}).populate("user").populate("group");
    }

    async getContact(contactId) {
        return Contact.findOne({_id: contactId}).populate("user").populate("group");
    }

    async checkExistingContact(phoneNumber, user) {
        return Contact.findOne({phoneNumber: phoneNumber, user: user.userId}).populate("user").populate("group");
    }

    async createContact(name, phoneNumber, group, user) {
        return (await (await Contact.create({name, phoneNumber, group,
            user: user.userId})).populate("user")).populate("group");
    }

    async updateContact(contactId, updatedData) {
        return Contact.findByIdAndUpdate(contactId, {...updatedData,
            lastUpdated: new Date()}, {new: true}).populate("user").populate("group");
    }

    async bulkUpdateContact(contactIds, updatedData){
        return Contact.updateMany({"_id": {"$in": contactIds}}, {"$set": updatedData});
    }
    async deleteContact(contactId) {
        return Contact.findByIdAndDelete(contactId);
    }
}

module.exports = new ContactService();
