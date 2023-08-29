const mongoose = require('mongoose');
const baseSchema = require("../base/model");

const messageSchema = new mongoose.Schema({
    type: {type: String, required: true},
    from: {type: String, required: true},
    recipient: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: String, required: true},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }
});

messageSchema.add(baseSchema); // Extend with the common fields

module.exports = mongoose.model('Message', messageSchema);
