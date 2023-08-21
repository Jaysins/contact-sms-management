const mongoose = require('mongoose');

const SenderIdSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    active: {type: Boolean, required: false},
    dateCreated: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SenderId', SenderIdSchema);
