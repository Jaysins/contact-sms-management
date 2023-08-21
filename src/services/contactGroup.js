const ContactGroup = require('../models/ContactGroup');

class ContactGroupService {
    async getAllContactGroups(user) {
        return ContactGroup.find({user: user.userId}).populate("user");
    }

    async getContactGroup(contactGroupId) {
        return ContactGroup.findOne({_id: contactGroupId}).populate("user");
    }

    async createContactGroup(name, user) {

        return (await ContactGroup.create({name, code:name.toLowerCase(), user: user.userId})).populate("user");
    }

    async updateContactGroup(contactGroupId, updatedData) {

        return ContactGroup.findByIdAndUpdate(contactGroupId, {
            ...updatedData,
            code: name.toLowerCase(),
            lastUpdated: new Date()
        }, {new: true}).populate("user");
    }

    async deleteContactGroup(contactGroupId) {
        return ContactGroup.findByIdAndDelete(contactGroupId);
    }
}

module.exports = new ContactGroupService();
