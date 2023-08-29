const mongoose = require('mongoose');
const baseSchema = require("../base/model");

const senderIdGroupSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    active: {type: Boolean, required: false}
});

senderIdGroupSchema.add(baseSchema); // Extend with the common fields


module.exports = mongoose.model('SenderIdGroup', senderIdGroupSchema);
