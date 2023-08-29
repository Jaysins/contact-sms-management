const ContactGroup = require('../models/ContactGroup');

class ContactGroupService {
    async getAllContactGroups(user) {
        return ContactGroup.find({'active': true});
    }

    async getContactGroup(contactGroupId) {
        return ContactGroup.findOne({"$or": [{_id: contactGroupId}, {code: contactGroupId}]});
    }

    async createContactGroup(name, user) {

        return (await ContactGroup.create({name, code: name.toLowerCase(), user: user.userId}));
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
