const mongoose = require('mongoose');
const baseSchema = require("../base/model");

const senderIdSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    group: {
        type: mongoose.Types.ObjectId,
        ref: 'SenderIdGroup',
        required: [false],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    active: {type: Boolean, required: false}
});

senderIdSchema.add(baseSchema); // Extend with the common fields


module.exports = mongoose.model('SenderId', senderIdSchema);
