const Contact = require('../models/Contact');

class ContactService {

    async getAllContacts(user) {
        return Contact.find({user: user.userId}).populate("user");
    }

    async getContact(contactId) {
        return Contact.findOne({_id: contactId}).populate("user");
    }

    async createContact(name, phoneNumber, user) {
        return (await Contact.create({name, phoneNumber, user: user.userId})).populate("user");
    }

    async updateContact(contactId, updatedData) {
        return Contact.findByIdAndUpdate(contactId, {...updatedData,
            lastUpdated: new Date()}, {new: true}).populate("user");
    }

    async deleteContact(contactId) {
        return Contact.findByIdAndDelete(contactId);
    }
}

module.exports = new ContactService();
