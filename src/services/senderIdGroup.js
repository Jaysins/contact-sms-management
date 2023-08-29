const SenderIdGroup = require('../models/SenderIdGroup');

class senderIdGroupService {
    async getAllSenderIdGroups() {
        return SenderIdGroup.find({});
    }
}

module.exports = new senderIdGroupService();
