const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    type: {type: String, required: true},
    from: {type: String, required: true},
    recipient: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: String, required: true},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    dateCreated: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);
